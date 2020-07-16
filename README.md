# dev.axonivy.com

## Setup

	docker-compose up -d
	docker-compose exec web composer install

## Execute tests

	docker-compose exec web ./vendor/bin/phpunit

## Generate the issue list for the new and noteworthy (improvements/bugs)

* `mvn -f tools/issue-list-generator package -Dversion=9.1`
* Copy&Paste the issues from the console to the files in the news folder

# IDE Setup

 * Use Eclipse PHP
 * Install Twig Plugin from Eclipse Marketplace

# Update a php library

	docker-compose exec web composer show --outdated
	docker-compose exec web composer require --update-with-dependencies slim/slim
	docker-compose exec web composer require --update-with-dependencies slim/twig-view
	docker-compose exec web composer require --dev --update-with-dependencies phpunit/phpunit

## Ressources

* Slim Project Bootstrap <https://github.com/kalvn/Slim-Framework-Skeleton>
* SlimFramework <http://www.slimframework.com>
* Template <https://templated.co/introspect>
* JS-Framework <https://github.com/ajlkn/skel>
