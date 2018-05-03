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

### After Release
* Fix Permalinks in Engine Guide
* Update developerAPI url on update.axonivy.com
* Move all ReleaseNotes.txt from root to documents folder -> check build

* Remove oboslete code in DocProvider, ReleaseInfo, ReleaseInfoRepository, DocAction$ (TODO)
* Remove parsedown

* PageSpeed
* FTP Account einschränken

* Entfernen for developers
* Testen mit blauen Links

* Add-Ons Seite - Monitor entfernen, Portal entfernen, Worklfow UIs entfernen

### Ideas
* Public Roadmap
* Blog on Medium
* Features Site
* Community Site
* Implement search in single books
