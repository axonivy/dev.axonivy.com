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
    buildDiscarder(logRotator(numToKeepStr: '120', artifactNumToKeepStr: '10'))
    skipStagesAfterUnstable()
  }
  
  stages {
    stage('distribution') {
      steps {
      	sh 'composer install --no-dev --no-progress'
        sh 'tar -cf ivy-website-developer.tar --exclude=src/web/releases src vendor'
        archiveArtifacts 'ivy-website-developer.tar'
      }
    }
    
    stage('test') {
      steps {
      	sh 'composer install --no-progress'
        sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
        junit 'phpunit-junit.xml'
      } 
    }
    
    stage('deploy') {
      when {
        branch 'master'
      }
      steps {
        sshagent(['zugprojenkins-ssh']) {
          script {
          	def targetFile = "ivy-website-developer-" + new Date().format("yyyy-MM-dd_HH-mm-ss-SSS");
            def targetFilename =  targetFile + ".tar"
            
            // transfer and untar
            sh "scp -o StrictHostKeyChecking=no ivy-website-developer.tar axonivya@217.26.51.247:/home/axonivya/deployment/$targetFilename"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 mkdir /home/axonivya/deployment/$targetFile"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 tar -xf /home/axonivya/deployment/$targetFilename -C /home/axonivya/deployment/$targetFile"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 rm -f /home/axonivya/deployment/$targetFilename"
            
            // create symlinks
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 mkdir /home/axonivya/deployment/$targetFile/src/web/releases"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/data/ivy-releases /home/axonivya/deployment/$targetFile/src/web/releases/ivy"

            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/deployment/$targetFile/src/web /home/axonivya/www/developer.axonivy.com/linktoweb"
          }
        }
      }
    }
  }
}