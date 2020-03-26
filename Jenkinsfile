pipeline {
  agent any
  
  triggers {
    cron '@midnight'
  }
  
  options {
    buildDiscarder(logRotator(numToKeepStr: '120', artifactNumToKeepStr: '10'))
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
        echo 'create distribution package'
      	sh 'composer install --no-dev --no-progress --prefer-dist'
        sh "tar -cf ${env.DIST_FILE} --exclude=src/web/releases src vendor"
        archiveArtifacts env.DIST_FILE
        stash name: 'website-tar', includes: env.DIST_FILE
 
        echo 'test'
      	sh 'composer install --no-progress --prefer-dist'
        sh './vendor/bin/phpunit --log-junit phpunit-junit.xml || exit 0'
        junit 'phpunit-junit.xml'
      } 
    }
    
    stage('deploy') {
      when {
        branch 'master'
      }
      agent {
      	docker {
	      image 'axonivy/build-container:ssh-client-1.0'
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
            sh "ssh $host ln -fns /home/axonivya/data/doc-cache $targetFolder/src/web/documentation"
            sh "ssh $host ln -fns $targetFolder/src/web /home/axonivya/www/developer.axonivy.com/linktoweb"
            sh "ssh $host ln -fns $targetFolder/src/app/DocCacher.php /home/axonivya/script/DocCacher.php"
          }
        }
      }
    }
  }
}