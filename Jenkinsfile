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
    DIST_FILE = "ivy-website-redesign.tar"
  }
  
  stages {
    stage('build') {      
      steps {

        // build
        script {
          docker.build('composer', '-f build/Dockerfile.composer .').inside {
            dir ('backend') {
              sh 'composer install --no-dev --no-progress'
            }
          }

          docker.build('node', '-f build/Dockerfile.node .').inside {
            dir ('frontend') {
              sh 'pnpm install --frozen-lockfile'
              sh 'pnpm build'
            }
          }
        }

        dir ('backend') {
          sh "tar -cf ${env.DIST_FILE}\
            --exclude=src/web/releases\
            --exclude=src/web/docs\
            --exclude=src/web/openapi\
            --exclude=src/web/public-api\
            --exclude=src/web/systemdb\
            src\
            vendor"
          archiveArtifacts env.DIST_FILE
          stash name: 'website-tar', includes: env.DIST_FILE
        }

        script {
          docker.build('composer', '-f build/Dockerfile.composer .').inside {
            dir ('backend') {
              // tests
              sh 'composer install --no-progress'
              sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
              junit 'phpunit-junit.xml'

              // bom
              if (env.BRANCH_NAME == 'master') {
                sh 'composer require --dev cyclonedx/cyclonedx-php-composer --no-progress'
                sh 'composer CycloneDX:make-sbom --output-format=JSON --output-file=bom.json'
                uploadBOM(projectName: 'dev.axonivy.com', projectVersion: 'master', bomFile: 'bom.json')
              }
            }
          }
        }
      }
    }

    stage('editorconfig') {
      steps {
        script {
          docker.build('editorconfig-checker', '-f build/Dockerfile.editorconfig .').inside {
            sh 'editorconfig-checker -no-color'
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
        }
      }
      steps {
        script {
          withSonarQubeEnv() {
            sh 'sonar-scanner'
          }
          timeout(time: 5, unit: 'MINUTES') {
            def qg = waitForQualityGate abortPipeline: false
            if (qg.status != 'OK') {
              //unstable("SonarQube Quality Gate failed: ${qg.status}")
            }    
          }
        }
      }
    }

    stage('deploy') {
      when {
        branch 'redesign'
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

            def targetFolder = "/home/axonivya/deployment/ivy-website-redesign-" + new Date().format("yyyy-MM-dd_HH-mm-ss-SSS");
            def targetFile =  targetFolder + ".tar"
            def host = 'axonivya@dev.axonivy.com'

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
            sh "ssh $host ln -fns /home/axonivya/data/openapi $targetFolder/src/web/openapi"
            sh "ssh $host ln -fns /home/axonivya/data/systemdb $targetFolder/src/web/systemdb"
            sh "ssh $host ln -fns /home/axonivya/data/public-api $targetFolder/src/web/public-api"
            sh "ssh $host ln -fns $targetFolder/src/web /home/axonivya/www/axonivya.myhostpoint.ch/linktoweb"
          }
        }
      }
    }
  }
}
