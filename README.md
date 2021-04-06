# dev.axonivy.com

## Setup
  
  Run the script to start docker and update web compose using `./up.sh`
  
  ... and later `docker-compose down` to stop the webserver.

## Execute tests

  docker-compose exec web ./vendor/bin/phpunit

## Generate the issue list for the new and noteworthy (improvements/bugs)

- Run https://jenkins.ivyteam.io/job/ivy-website-developer_issue-list-generator with the ivy version to release
- Copy and paste the issues from the console log to the files in the news folder

# IDE Setup

- Use Eclipse PHP
- Install Twig Plugin from Eclipse Marketplace

# Update a php library

  docker-compose exec web composer show --outdated

  docker-compose exec web composer require --update-with-dependencies slim/slim
  docker-compose exec web composer require --update-with-dependencies slim/twig-view
  docker-compose exec web composer require --update-with-dependencies slim/psr7
  docker-compose exec web composer require --update-with-dependencies php-di/php-di

  docker-compose exec web composer require --dev --update-with-dependencies phpunit/phpunit

## Ressources

- Slim Project Bootstrap <https://github.com/kalvn/Slim-Framework-Skeleton>
- SlimFramework <http://www.slimframework.com>
- Template <https://templated.co/introspect>
- JS-Framework <https://github.com/ajlkn/skel>
