<?php

namespace app;

use app\api\ApiCurrentRelease;
use app\api\StatusApi;
use app\pages\github\GitHubAction;
use app\pages\api\ApiBrowserAction;
use app\pages\doc\DocAction;
use app\pages\doc\DocOverviewAction;
use app\pages\doc\redirect\LegacyDesignerGuideDocAction;
use app\pages\doc\redirect\LegacyEngineGuideDocAction;
use app\pages\doc\redirect\LegacyPublicAPIAction;
use app\pages\doc\redirect\LegacyRedirectLatestDocVersion;
use app\pages\doc\redirect\RedirectPortalGuide;
use app\pages\download\DownloadAction;
use app\pages\download\DownloadRobotsAction;
use app\pages\download\archive\ArchiveAction;
use app\pages\download\maven\MavenArchiveAction;
use app\pages\home\HomeAction;
use app\pages\installation\InstallationAction;
use app\pages\news\NewsAction;
use app\pages\release\ReleaseCycleAction;
use app\pages\search\SearchAction;
use app\pages\sitemap\SitemapAction;
use app\pages\support\SupportAction;
use app\pages\team\TeamAction;
use app\pages\tutorial\TutorialAction;
use app\pages\deprecation\DeprecationAction;
use app\pages\market\LegacyMarketRedirectAction;
use app\permalink\ProductPermalinkAction;
use app\permalink\MavenPermalinkAction;
use app\permalink\LegacyPortalPermalinkAction;
use app\permalink\LinkAction;
use Slim\App;

class RoutingRules
{
  public static function installRoutes(App $app)
  {
    $app->get('/', HomeAction::class);
    $app->get('/team', TeamAction::class);
    $app->get('/support', SupportAction::class);
    $app->get('/search', SearchAction::class);
    $app->get('/github', GitHubAction::class);
    $app->get('/tutorial', TutorialAction::class);

    $app->get('/download/maven.html', MavenArchiveAction::class);
    $app->get('/download/archive[/{version}]', ArchiveAction::class);
    $app->get('/download/robots.txt', DownloadRobotsAction::class);
    $app->get('/download[/{version}]', DownloadAction::class); // leading-edge/sprint/nightly/dev

    $app->get('/release-cycle', ReleaseCycleAction::class);

    $app->get('/maven/{groupId}/{artifactId}/{version}[/{type}]', MavenPermalinkAction::class);
    $app->get('/permalink/{version}/{file}', ProductPermalinkAction::class);

    $app->get('/doc', DocOverviewAction::class);

    $app->get('/doc/{version}/portal-guide[/{path:.*}]', RedirectPortalGuide::class);
    $app->get('/doc/{version}/{lang:[a-z][a-z]}/portal-guide[/{path:.*}]', RedirectPortalGuide::class);
    $app->get('/doc/{version:latest}[/{path:.*}]', LegacyRedirectLatestDocVersion::class);
    $app->get('/doc/{version}.latest[/{path:.*}]', LegacyRedirectLatestDocVersion::class);
    $app->get('/doc/{version}/EngineGuideHtml[/{htmlDocument}]', LegacyEngineGuideDocAction::class);
    $app->get('/doc/{version}/DesignerGuideHtml[/{htmlDocument}]', LegacyDesignerGuideDocAction::class);
    $app->get('/doc/{version}/PublicAPI[/{path:.*}]', LegacyPublicAPIAction::class);
    $app->get('/doc/{version}/{document:.*}', DocAction::class);
    $app->get('/doc/{version}', DocAction::class);

    $app->get('/link/{key}[/{version}]', LinkAction::class);

    $app->get('/api-browser', ApiBrowserAction::class);

    $app->get('/portal[/{path:.*}]', LegacyPortalPermalinkAction::class);

    $app->get('/installation', InstallationAction::class);
    $app->get('/features/deprecation', DeprecationAction::class);

    $app->get('/api/currentRelease', ApiCurrentRelease::class);
    $app->get('/api/status', StatusApi::class);

    $app->get('/sitemap.xml', SitemapAction::class);

    $app->get('/news[/{version}]', NewsAction::class);

    $app->get('/market[/{path:.*}]', LegacyMarketRedirectAction::class);
  }
}
