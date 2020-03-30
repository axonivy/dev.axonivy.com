<?php
namespace app;

use DI\Container;
use Middlewares\TrailingSlash;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\api\ApiCurrentRelease;
use app\api\StatusApi;
use app\domain\ReleaseInfo;
use app\domain\ReleaseType;
use app\pages\community\CommunityAction;
use app\pages\doc\DocAction;
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
use app\pages\tutorial\gettingstarted\TutorialGettingStartedAction;
use app\permalink\PortalPermalinkAction;
use app\permalink\ProductPermalinkAction;
use app\permalink\ThirdpartyLibraryPermalink;
use Throwable;
use app\pages\doc\DocOverviewAction;

class Website
{
    private $app;
    
    function __construct()
    {
        Config::initConfig();

        $container = new Container();
        $this->app = AppFactory::createFromContainer($container);
        $this->configureTemplateEngine();
        $this->installTrailingSlashRedirect();
        $this->installRoutes();
        $this->installErrorHandling();
    }

    public function getApp(): App
    {
        return $this->app;
    }

    public function start()
    {
        $this->app->run();
    }
    
    private function configureTemplateEngine()
    {
        $container = $this->app->getContainer();
        
        $this->app->getContainer()->set(Twig::class, function (ContainerInterface $container) {
            return Twig::create(__DIR__ . '/../app/pages');
        });
        
        $view = $container->get(Twig::class);
        
        $releaseTypeLTS = ReleaseType::LTS();
        $releaseTypeLE = ReleaseType::LE();
        
        $versionLTS = $this->getDisplayVersion($releaseTypeLTS->releaseInfo());
        $leRelease = $this->getDisplayVersion($releaseTypeLE->releaseInfo());

        $text = $versionLTS;
        $textLong = $releaseTypeLTS->shortName() . " $versionLTS";
        if (!empty($leRelease))
        {
            $text .= " / $leRelease";
            $textLong .= " / " . $releaseTypeLE->shortName() . " $leRelease";
        }
        $view->getEnvironment()->addGlobal('CURRENT_VERSION_DOWNLOAD', $text);
        $view->getEnvironment()->addGlobal('CURRENT_VERSION_DOWNLOAD_LONG', $textLong);
        
        $view->getEnvironment()->addGlobal('PRODUCTIVE_SYSTEM', !Config::isDevOrTestEnv());
    }
    
    private function getDisplayVersion(?ReleaseInfo $info): string
    {
        return $info == null ? '' : $info->getVersion()->getDisplayVersion();
    }
    
    private function installTrailingSlashRedirect()
    {
        $this->app->add((new TrailingSlash(false))->redirect());
    }
    
    private function installRoutes()
    {
        $app = $this->app;
        
        $app->redirect('/download/sprint-release', '/download/sprint', 301);

        $app->get('/', HomeAction::class);
        $app->get('/team', TeamAction::class);
        $app->get('/support', SupportAction::class);
        $app->get('/search', SearchAction::class);
        $app->get('/community', CommunityAction::class);
        $app->get('/tutorial', TutorialAction::class);
        $app->get('/tutorial/getting-started[/{name}/step-{stepNr}]', TutorialGettingStartedAction::class);
        
        $app->get('/download/maven.html', MavenArchiveAction::class);
        $app->get('/download/archive[/{version}]', ArchiveAction::class);
        $app->get('/download[/{version}]', DownloadAction::class); // leading-edge/sprint/nightly/dev
        
        $app->get('/release-cycle', ReleaseCycleAction::class);

        $app->get('/permalink/{version}/{file}', ProductPermalinkAction::class);
        $app->get('/permalink/lib/{version}/{name}', ThirdpartyLibraryPermalink::class);

        $app->get('/doc', DocOverviewAction::class);
        
        $app->get('/doc/{version:latest}[/{path:.*}]', LegacyRedirectLatestDocVersion::class);
        $app->get('/doc/{version}.latest[/{path:.*}]', LegacyRedirectLatestDocVersion::class);
        
        
        $app->get('/doc/{version}', DocAction::class);
        $app->get('/doc/{version}/{document:.*}', DocAction::class);

        $app->get('/doc/{version}/EngineGuideHtml[/{htmlDocument}]', LegacyEngineGuideDocAction::class);
        $app->get('/doc/{version}/DesignerGuideHtml[/{htmlDocument}]', LegacyDesignerGuideDocAction::class);
        $app->get('/doc/{version}/PublicAPI[/{path:.*}]', LegacyPublicAPIAction::class);

        $app->get('/market', MarketAction::class);
        $app->get('/market/{key}[/{version}]', ProductAction::class);

        $app->get('/portal[/{version}[/{topic}]]', PortalPermalinkAction::class);

        $app->get('/installation', InstallationAction::class);

        $app->get('/api/currentRelease', ApiCurrentRelease::class);
        $app->get('/api/status', StatusApi::class);

        $app->get('/sitemap.xml', SitemapAction::class);

        $app->get('/news[/{version}]', NewsAction::class);
    }

    private function installErrorHandling()
    {
        $container = $this->app->getContainer();
        $errorMiddleware = $this->app->addErrorMiddleware(true, true, true);
        $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
            $response = new Response();
            return $container->get(Twig::class)
                ->render($response, '_error/404.twig')
                ->withStatus(404);
        });
        
        if (!Config::isDevOrTestEnv())
        {
            $errorMiddleware->setDefaultErrorHandler(function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
                $response = new Response();
                $data = ['message' => $exception->getMessage()];
                return $container->get(Twig::class)
                    ->render($response, '_error/500.twig', $data)
                    ->withStatus(500);
            });
        }
    }
}
