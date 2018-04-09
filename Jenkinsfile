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
      	sh 'composer install --no-dev'
        sh 'tar -cf developer-website.tar src && tar -rf developer-website.tar vendor'
        archiveArtifacts 'developer-website.tar'
      }
    }
    
    stage('deploy') {
      when {
        branch 'master'
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS' 
        }
        expression {
          params.deployToProduction         
        }
      }
      steps {
        echo 'deploy!';
        sshagent(['3015bfe2-5718-4bd4-9da0-6a5f0169cbfc']) {
          script {
          	def targetFile = "developer-website-" + new Date().format("yyyy-MM-dd_HH-mm-ss-SSS");
            def targetFilename =  targetFile + ".tar"
            
            // copy and unzip
            sh "scp -o StrictHostKeyChecking=no developer-website.tar axonivya@217.26.51.247:/home/axonivya/deployment/$targetFilename"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 mkdir /home/axonivya/deployment/$targetFile"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 tar -xf /home/axonivya/deployment/$targetFilename -C /home/axonivya/deployment/$targetFile"
            
            // create symlinks
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/deployment/$targetFile/src/web /home/axonivya/www/prototype.axonivya.myhostpoint.ch/linktoweb"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 ln -fns /home/axonivya/data/blob-dev-website /home/axonivya/deployment/$targetFile/src/web/blob"
            
            // housekeeping - delete tar / delete all folders but last 5 ones
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 rm -f /home/axonivya/deployment/$targetFilename"
            sh "ssh -o StrictHostKeyChecking=no axonivya@217.26.51.247 'ls -t -d /home/axonivya/deployment/developer-website-* | tail -n +6 | xargs rm -rf --'"
            
            // TODO use more variables
            // TODO change mode to prod of slim framework
          }
        }
      }
    }
  }
}