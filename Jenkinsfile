pipeline {
  agent any
  
  triggers {
    cron 'H 22 * * *'
  }
  
  options {
    buildDiscarder(logRotator(numToKeepStr: '120', artifactNumToKeepStr: '3'))
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
        echo 'create distribution package'
        sh 'composer install --no-dev --no-progress'
        sh "tar -cf ${env.DIST_FILE} src vendor"
        archiveArtifacts env.DIST_FILE
        stash name: 'website-tar', includes: env.DIST_FILE
 
        echo 'test'
        sh 'composer install --no-progress'
        sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
        junit 'phpunit-junit.xml'
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
  }
}
