pipeline {
  agent {
    dockerfile {
      dir 'docker/apache'    
    }
  }
  triggers {
    cron '@midnight'
  }
  options {
    buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
  }
  parameters {
    booleanParam(defaultValue: false, description: 'Deploy to production?', name: 'deployToProduction')
  }
  stages {
    stage('distribution') {
      steps {
      	sh 'composer install --no-dev --no-progress'
        sh 'tar -cf ivy-website-developer.tar src vendor'
        archiveArtifacts 'ivy-website-developer.tar'
      }
    }
    
    stage('test') {
      steps {
      	sh 'composer install --no-progress'
        sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
      }
      post {
        always {
          junit 'phpunit-junit.xml'
        }
      }
    }
    
    stage('deploy') {
      when {
        branch 'master'
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS' 
        }
        /*expression {
          input 'Do you want to deploy to production?'
        }*/
        expression {
          params.deployToProduction         
        }
      }
      steps {
        sshagent(['3015bfe2-5718-4bd4-9da0-6a5f0169cbfc']) {
          script {
          	def targetFile = "ivy-website-developer-" + new Date().format("yyyy-MM-dd_HH-mm-ss-SSS");
            def targetFilename =  targetFile + ".tar"
            
            // transfer and untar
            sh "scp -o StrictHostKeyChecking=no ivy-website-developer.tar axonivya@217.26.51.247:/home/axonivya/deployment/$targetFilename"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 mkdir /home/axonivya/deployment/$targetFile"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 tar -xf /home/axonivya/deployment/$targetFilename -C /home/axonivya/deployment/$targetFile"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 rm -f /home/axonivya/deployment/$targetFilename"
            
            // create symlinks
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/data/blob-dev-website /home/axonivya/deployment/$targetFile/src/web/blob"

            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 mkdir /home/axonivya/deployment/$targetFile/src/web/releases"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/data/ivy-releases /home/axonivya/deployment/$targetFile/src/web/releases/ivy"

            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/deployment/$targetFile/src/web /home/axonivya/www/developer.axonivy.com/linktoweb"
          }
        }
      }
    }
  }
}