# dev.axonivy.com

## Setup
	docker-compose up -d
	docker-compose exec web composer install

## Execute tests
	docker-compose exec web ./vendor/bin/phpunit

## Big Files
Please do not commit big files in this repo. If you need to reference binary large objects upload them to blob.axonivy.works.

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

### Ideas
* Public Roadmap
* Blog on Medium
* Features Site
* Community Site
* Implement search in single books
* Documentation: Add Links to switch fast between different versions
* Design: Try to change links to blue
* AddOns-Page: Remove Monitor / Remove Portal / Remove Workflow UI's
