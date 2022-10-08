pipeline {
  agent any
  
  triggers {
    cron 'H 22 * * *'
  }
  
  options {
    buildDiscarder(logRotator(numToKeepStr: '120', artifactNumToKeepStr: '3'))
  }

  stages {
    stage('build') {
      steps {
        script {
          docker.build("engine-listing-service:dev", "-f docker/dev/Dockerfile docker/dev").inside {
            sh 'composer install --no-dev --no-progress'
          }

          def image = docker.build("engine-listing-service:latest", "-f docker/prod/Dockerfile .")
          if (env.BRANCH_NAME == 'master') {
            docker.withRegistry('https://docker-registry.ivyteam.io', 'docker-registry.ivyteam.io') {
              image.push()
            }
          }
        }
        //sh 'composer install --no-progress'
        //sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
        //junit 'phpunit-junit.xml'
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
