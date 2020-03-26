# dev.axonivy.com

## Setup
	docker-compose up -d
	docker-compose exec web composer install

## Execute tests
	docker-compose exec web ./vendor/bin/phpunit

# Update a php library
	docker-compose exec web composer require --update-with-dependencies slim/slim
	docker-compose exec web composer require --update-with-dependencies slim/twig-view
	docker-compose exec web composer require --update-with-dependencies slim/logger

	docker-compose exec web composer require --dev --update-with-dependencies phpunit/phpunit

## Big Files
Do not commit big files in this repo. If you need to reference binary large objects upload them to blob.axonivy.works.

## Ressources
* Slim Project Bootstrap <https://github.com/kalvn/Slim-Framework-Skeleton>
* SlimFramework <http://www.slimframework.com>
* Template <https://templated.co/introspect>
* JS-Framework <https://github.com/ajlkn/skel>
