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

### TODO
* Search (Zu grosses Text Feld)
* Search (in einzelnen Books)

* Twitter Feed einbinden (News)

* Tutorial für erstes Tutorial ein Bild

* Add-Ons Seite - Monitor entfernen, Portal entfernen, Worklfow UIs entfernen

* FTP Account einschränken

* Archive (Dropdown-Eintrag pro LE/LTS etc, Le/lts IM DROPDOWN ERWÄHNEN)
* Archive (Dropdown -> UNSUPPORTED)
* Archive (Documentation in archive spalte nicht korrekt bei 5)

* Startseite (Download Buttons Mergen, Unten eventuell eine Kleine Info, Im Header einen Download Knopf mit Version)

* Dokumentation (release documents in iframe)
* Dokumentation (Portal Con. versteht man nciht)

* Add addresse
* Entfernen for developers

* Testen mit blauen Links
* Hover Pink
* Grün oben im Header nicht exakt gleich

### After Release
* Fix Permalinks in Engine Guide
* Update developerAPI url on update.axonivy.com
* Move all ReleaseNotes.txt from root to documents folder -> check build
* Remove oboslete code in DocProvider, ReleaseInfo, ReleaseInfoRepository, DocAction
* PageSpeed

### Ideas
* Public Roadmap
* Blog on Medium
* Features Site
* Community Site
