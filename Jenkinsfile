pipeline {
  agent any
  
  triggers {
    cron 'H 22 * * *'
  }
  
  options {
    buildDiscarder(logRotator(numToKeepStr: '120', artifactNumToKeepStr: '3'))
    skipStagesAfterUnstable()
  }
  
  environment {
    DIST_FILE = "ivy-website-developer.tar"
  }
  
  stages {
    stage('build') {
      agent {
        dockerfile {
          dir 'docker/apache'    
        }
      }
      steps {
        sh 'composer install --no-dev --no-progress'
        sh "tar -cf ${env.DIST_FILE} --exclude=src/web/releases --exclude=src/web/docs src vendor"
        archiveArtifacts env.DIST_FILE
        stash name: 'website-tar', includes: env.DIST_FILE
 
        sh 'composer install --no-progress'
        sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
        junit 'phpunit-junit.xml'

        script {
          if (env.BRANCH_NAME == 'master') {
            sh 'composer require --dev cyclonedx/cyclonedx-php-composer --no-progress'
            sh 'composer CycloneDX:make-sbom --output-format=JSON --output-file=bom.json'
            withCredentials([string(credentialsId: 'dependency-track', variable: 'API_KEY')]) {
              sh 'curl -X POST -v https://dependency-track.ivyteam.io/api/v1/bom \
                      -H "Content-Type: multipart/form-data" \
                      -H "X-API-Key: ' + API_KEY + '" \
                      -F "project=6a84925b-4ce2-4dcb-8d83-d1e418c84b5a" \
                      -F "bom=@bom.json"'
            }
          }
        }
      }
    }

    stage('sonar') {
      when {
        branch 'master'
      }
      agent {
        docker {
          image 'sonarsource/sonar-scanner-cli'
          args '-e SONAR_HOST_URL=https://sonar.ivyteam.io'
        }
      }
      steps {
        sh 'sonar-scanner'
      }
    }

    stage('check editorconfig') {
      steps {
        script {
          docker.image('mstruebing/editorconfig-checker').inside {
            sh 'ec -no-color'
          }
        }
      }
    }

    stage('deploy') {
      when {
        branch 'master'
      }
      agent {
        docker {
          image 'axonivy/build-container:ssh-client-1'
        }
      }
      steps {
        sshagent(['zugprojenkins-ssh']) {
          script {
            unstash 'website-tar'

            def targetFolder = "/home/axonivya/deployment/ivy-website-developer-" + new Date().format("yyyy-MM-dd_HH-mm-ss-SSS");
            def targetFile =  targetFolder + ".tar"
            def host = 'axonivya@217.26.51.247'

            // copy
            sh "scp ${env.DIST_FILE} $host:$targetFile"

            // untar
            sh "ssh $host mkdir $targetFolder"
            sh "ssh $host tar -xf $targetFile -C $targetFolder"
            sh "ssh $host rm -f $targetFile"

            // symlink
            sh "ssh $host mkdir $targetFolder/src/web/releases"
            sh "ssh $host ln -fns /home/axonivya/data/ivy-releases $targetFolder/src/web/releases/ivy"
            sh "ssh $host ln -fns /home/axonivya/data/doc $targetFolder/src/web/docs"
            sh "ssh $host ln -fns $targetFolder/src/web /home/axonivya/www/developer.axonivy.com/linktoweb"
          }
        }
      }
    }
  }
}
