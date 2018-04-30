# dev.axonivy.com

## Setup
	docker-compose up -d
	docker-compose exec web composer install

## Execute tests
	docker-compose exec web ./vendor/bin/phpunit

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

## ToDo

* Differ between LE and LTS (pes) -> user must download LTS like ubuntu

* Reto/Balsi: Install Button

* sitemap.xml
* robots.txt

* Doc: Improve integration
* Doc: Check old releases

* Refactor: Hotfix Stuff

* Stable Permalinks Site

* Reguel: switch zwischen Engine / Designer guide sehe ich nicht. Oder geht nur via PDF?
* Reguel: doc-menu bleibt nicht stehen (rechts)


### After Release
* Fix Permalinks in Engine Guide
* Styling DevDay
* Styling CodeCamp
* Check build upload unecessary .htacces / index.php
* PageSpeed

### Ideas
* Public Roadmap
* Blog on Medium
* Features Site
* Community Site
