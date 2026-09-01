<?php

namespace app;

use app\api\ApiCurrentReleaseAction;
use app\api\ApiStatusAction;
use app\api\ApiDocsAction;
use app\redirect\LegacyPortalPermalinkAction;
use app\redirect\TutorialAction;
use app\redirect\ProductPermalinkAction;
use app\redirect\MavenPermalinkAction;
use app\redirect\LinkAction;
use app\redirect\DocAction;
use app\redirect\RedirectPortalGuide;
use app\ui\UiDocAction;
use app\ui\UiDocLegacyAction;
use app\ui\UiDownloadAction;
use app\ui\UiArchiveAction;
use app\tool\DownloadRobotsAction;
use app\tool\MavenArchiveAction;
use Slim\App;

class RoutingRules
{
  public static function installRoutes(App $app)
  {
    // api
    $app->get('/api/currentRelease', ApiCurrentReleaseAction::class);
    $app->get('/api/status', ApiStatusAction::class);
    $app->get('/api/docs/{product}/{version}/{language}', ApiDocsAction::class);

    // redirects
    $app->get('/doc/{version}/portal-guide[/{path:.*}]', RedirectPortalGuide::class);
    $app->get('/doc/{version}/{lang:[a-z][a-z]}/portal-guide[/{path:.*}]', RedirectPortalGuide::class);
    $app->get('/tutorial', TutorialAction::class);
    $app->get('/link/{key}[/{version}]', LinkAction::class);
    $app->get('/permalink/{version}/{file}', ProductPermalinkAction::class);
    $app->get('/maven/{groupId}/{artifactId}/{version}[/{type}]', MavenPermalinkAction::class);
    $app->get('/doc/{version}/{document:.*}', DocAction::class);
    $app->get('/doc/{version}', DocAction::class);
    $app->get('/portal[/{path:.*}]', LegacyPortalPermalinkAction::class);

    // frontend api
    $app->get('/ui/doc', UiDocAction::class);
    $app->get('/ui/download[/{version}]', UiDownloadAction::class);
    $app->get('/ui/archive[/{version}]', UiArchiveAction::class);
    $app->get('/ui/legacy/doc/{version}[/{document:.*}]', UiDocLegacyAction::class);

    // tools
    $app->get('/download/maven.html', MavenArchiveAction::class);
    $app->get('/download/robots.txt', DownloadRobotsAction::class);
  }
}
