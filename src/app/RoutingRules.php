<?php

namespace app;

use app\api\ApiCurrentRelease;
use app\api\StatusApi;
use app\api\Docs;
use app\ui\UiDocAction;
use app\ui\UiDownloadAction;
use app\ui\UiArchiveAction;
use app\pages\github\GitHubAction;
use app\pages\api\ApiBrowserAction;
use app\pages\doc\DocAction;
use app\permalink\RedirectPortalGuide;
use app\pages\download\DownloadRobotsAction;
use app\pages\download\maven\MavenArchiveAction;
use app\pages\support\SupportAction;
use app\permalink\TutorialAction;
use app\permalink\ProductPermalinkAction;
use app\permalink\MavenPermalinkAction;
use app\permalink\LinkAction;
use Slim\App;

class RoutingRules
{
  public static function installRoutes(App $app)
  {
    $app->get('/support', SupportAction::class);
    $app->get('/tutorial', TutorialAction::class);

    $app->get('/download/maven.html', MavenArchiveAction::class);
    $app->get('/download/robots.txt', DownloadRobotsAction::class);

    $app->get('/maven/{groupId}/{artifactId}/{version}[/{type}]', MavenPermalinkAction::class);
    $app->get('/permalink/{version}/{file}', ProductPermalinkAction::class);

    $app->get('/doc/{version}/portal-guide[/{path:.*}]', RedirectPortalGuide::class);
    $app->get('/doc/{version}/{lang:[a-z][a-z]}/portal-guide[/{path:.*}]', RedirectPortalGuide::class);
    $app->get('/doc/{version}/{document:.*}', DocAction::class);
    $app->get('/doc/{version}', DocAction::class);

    $app->get('/link/{key}[/{version}]', LinkAction::class);

    $app->get('/api-browser', ApiBrowserAction::class);

    $app->get('/api/currentRelease', ApiCurrentRelease::class);
    $app->get('/api/status', StatusApi::class);
    $app->get('/api/docs/{product}/{version}/{language}', Docs::class);

    $app->get('/ui/doc', UiDocAction::class);
    $app->get('/ui/download[/{version}]', UiDownloadAction::class);
    $app->get('/ui/archive[/{version}]', UiArchiveAction::class);
  }
}
