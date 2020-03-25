# URLs overview

/doc/8.0.3								example for a specific version
/doc/8.0                                symlink, created while deployment
/doc/latest|dev|nightly|sprint          symlinks
/doc/8.0.latest                         DEPRECATED, always use use /doc/8.0, redirect to latest 8.0 e.g. /doc/8.0.3 

/download                               browseable user page, outlines you want LTS
/download/nightly|sprint			    browseable user page, for development releases





/permalink/latest/*.deb                 latest official released version -> LE
/permalink/8.0/*.deb                    latest 8.0 release
/permalink/dev|nightly|sprint/*.deb     development versions

/portal/latest                          latest official released version -> LE
/portal/dev|sprint|nightly              always latest milestone relasee

/api/currentRelease
{ 
	'latestReleaseVersion' = latest official released version -> LE
    'latestServiceReleaseVersion' = latest service release of your release
}

/installation                          here you will download latest

/market                                is showing latest official release by default

/download/archive                      shows by default LE

/permalink/lib/dev/{name}              only dev supported, for libraries, used e.g. in docker showcase


/doc/${version}
/doc/${version}/new-and-noteworthy
/doc/${version}/migration-notes
/doc/${version}/release-notes
/portal [Portal Landing Page]
/portal/${version} [Portal Landing Page for specific version (dev, sprint, nightly, latest also supported)]
/portal/${version}/doc [Portal Doc for specific version (dev, sprint, nightly, latest also supported)]