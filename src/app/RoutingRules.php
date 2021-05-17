<?php

namespace app;

use app\api\ApiCurrentRelease;
use app\api\StatusApi;
use app\pages\community\CommunityAction;
use app\pages\api\ApiBrowserAction;
use app\pages\doc\DocAction;
use app\pages\doc\DocOverviewAction;
use app\pages\doc\redirect\LegacyDesignerGuideDocAction;
use app\pages\doc\redirect\LegacyEngineGuideDocAction;
use app\pages\doc\redirect\LegacyPublicAPIAction;
use app\pages\doc\redirect\LegacyRedirectLatestDocVersion;
use app\pages\download\DownloadAction;
use app\pages\download\archive\ArchiveAction;
use app\pages\download\maven\MavenArchiveAction;
use app\pages\home\HomeAction;
use app\pages\installation\InstallationAction;
use app\pages\market\MarketAction;
use app\pages\market\ProductAction;
use app\pages\news\NewsAction;
use app\pages\release\ReleaseCycleAction;
use app\pages\search\SearchAction;
use app\pages\sitemap\SitemapAction;
use app\pages\support\SupportAction;
use app\pages\team\TeamAction;
use app\pages\tutorial\TutorialAction;
use app\permalink\PortalPermalinkAction;
use app\permalink\ProductPermalinkAction;
use app\permalink\LibraryPermalinkAction;
use app\permalink\LinkAction;
use app\pages\market\MetaJsonAction;
use app\pages\market\OpenApiJsonAction;
use app\pages\market\MetaRedirectAction;

class RoutingRules
{
  public static function installRoutes($app)
  {
    $app->redirect('/download/sprint-release', '/download/sprint', 301);

    $app->get('/', HomeAction::class);
    $app->get('/team', TeamAction::class);
    $app->get('/support', SupportAction::class);
    $app->get('/search', SearchAction::class);
    $app->get('/community', CommunityAction::class);
    $app->get('/tutorial', TutorialAction::class);

    $app->get('/download/maven.html', MavenArchiveAction::class);
    $app->get('/download/archive[/{version}]', ArchiveAction::class);
    $app->get('/download[/{version}]', DownloadAction::class); // leading-edge/sprint/nightly/dev

    $app->get('/release-cycle', ReleaseCycleAction::class);

    $app->get('/permalink/{version}/{file}', ProductPermalinkAction::class);
    $app->get('/permalink/lib/{version}/{name}', LibraryPermalinkAction::class);

    $app->get('/doc', DocOverviewAction::class);

    $app->get('/doc/{version:latest}[/{path:.*}]', LegacyRedirectLatestDocVersion::class);
    $app->get('/doc/{version}.latest[/{path:.*}]', LegacyRedirectLatestDocVersion::class);
    $app->get('/doc/{version}/EngineGuideHtml[/{htmlDocument}]', LegacyEngineGuideDocAction::class);
    $app->get('/doc/{version}/DesignerGuideHtml[/{htmlDocument}]', LegacyDesignerGuideDocAction::class);
    $app->get('/doc/{version}/PublicAPI[/{path:.*}]', LegacyPublicAPIAction::class);
    $app->get('/doc/{version}/{document:.*}', DocAction::class);
    $app->get('/doc/{version}', DocAction::class);
    
    $app->get('/link/{key}[/{path:.*}]', LinkAction::class);

    $app->get('/api-browser', ApiBrowserAction::class);

    $app->get('/market', MarketAction::class);
    $app->get('/market/{key}/meta.json', MetaRedirectAction::class);
    $app->get('/market/{key}[/{version}]', ProductAction::class);
    $app->get('/_market/{key}/_meta.json', MetaJsonAction::class);
    $app->get('/_market/{key}/openapi', OpenApiJsonAction::class);

    $app->get('/portal[/{version}[/{topic}[/{path:.*}]]]', PortalPermalinkAction::class);

    $app->get('/installation', InstallationAction::class);

    $app->get('/api/currentRelease', ApiCurrentRelease::class);
    $app->get('/api/status', StatusApi::class);

    $app->get('/sitemap.xml', SitemapAction::class);

    $app->get('/news[/{version}]', NewsAction::class);
  }
}
