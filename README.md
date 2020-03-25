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

## Search
The files `src/app/search/_cse_annotations.xml` and `src/app/search/_cse_context.xml` are not referenced on the webpage.

But they are needed to add _Annotation_ and _Facet_  to the custom google search.
They could be uploaded to google on <https://cse.google.com/> with user info@ivyteam.ch.
Menu entry > Setup > Advanced.
