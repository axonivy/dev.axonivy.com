<?php
namespace app;

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
use app\community\CommunityAction;
use app\doc\DocAction;
use app\doc\LegacyDesignerGuideDocAction;
use app\doc\LegacyEngineGuideDocAction;
use app\doc\LegacyPublicAPIAction;
use app\doc\RedirectLatestDocVersion;
use app\feature\FeatureAction;
use app\installation\InstallationAction;
use app\market\MarketAction;
use app\market\ProductAction;
use app\news\NewsAction;
use app\permalink\LibPermalink;
use app\portal\PortalAction;
use app\release\ArchiveAction;
use app\release\DevReleasesDownloadAction;
use app\release\DownloadAction;
use app\release\MavenArchiveAction;
use app\release\PermalinkAction;
use app\release\SecurityVulnerabilityAction;
use app\release\model\ReleaseInfo;
use app\release\model\ReleaseInfoRepository;
use app\search\SearchAction;
use app\sitemap\SitemapAction;
use app\support\SupportAction;
use app\team\TeamAction;
use app\tutorial\TutorialAction;
use app\tutorial\gettingstarted\TutorialGettingStartedAction;
use Throwable;

class Website
{
    private $app;
    
    function __construct()
    {
        // load dev-config otherwise prod config
        Config::initConfig();

        $container = new \DI\Container();
        $this->app = AppFactory::createFromContainer($container);
        $this->configureTemplateEngine();
        $this->app->add((new TrailingSlash(false))->redirect());
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
        
        $container->set('view', function (ContainerInterface $container) {
            return Twig::create(__DIR__ . '/..');
        });

        $view = $container->get('view');
        $versionLTS = $this->getDisplayVersion(ReleaseInfoRepository::getLatestLongTermSupport());
        $versionLE = $this->getDisplayVersion(ReleaseInfoRepository::getLatest());

        $text = "$versionLTS";
        $textLong = "LTS $versionLTS";
        if ($versionLTS != $versionLE)
        {
            $text .= " / $versionLE";
            $textLong .= " / LE $versionLE";
        }
        $view->getEnvironment()->addGlobal('CURRENT_VERSION_DOWNLOAD', $text);
        $view->getEnvironment()->addGlobal('CURRENT_VERSION_DOWNLOAD_LONG', $textLong);
    }
    
    private function getDisplayVersion(?ReleaseInfo $info): string
    {
        return $info == null ? '' : $info->getVersion()->getDisplayVersion();
    }
    
    private function installRoutes()
    {
        $app = $this->app;
        
        $app->redirect('/download/addons[.html]', '/market', 301);
        $app->redirect('/download/community.html', '/community', 301);
        $app->redirect('/download/archive.html', '/download/archive', 301);
        $app->redirect('/download/securityvulnerability.html', '/download/securityvulnerability', 301);
        $app->redirect('/download/sprint-release[.html]', '/download/sprint', 301);

        $app->get('/', FeatureAction::class);

        $app->get('/download', DownloadAction::class);
        $app->get('/download/archive[/{version}]', ArchiveAction::class);
        $app->get('/download/maven.html', MavenArchiveAction::class);
        $app->get('/download/securityvulnerability', SecurityVulnerabilityAction::class);
        $app->get('/download/{version}', DevReleasesDownloadAction::class);

        $app->get('/permalink/{version}/{file}', PermalinkAction::class);
        $app->get('/permalink/lib/{version}/{name}', LibPermalink::class);

        $app->get('/doc', DocAction::class);
        $app->get('/doc/{version}.latest[/{path:.*}]', RedirectLatestDocVersion::class);
        $app->get('/doc/{version}', DocAction::class);
        $app->get('/doc/{version}/EngineGuideHtml[/{htmlDocument}]', LegacyEngineGuideDocAction::class);
        $app->get('/doc/{version}/DesignerGuideHtml[/{htmlDocument}]', LegacyDesignerGuideDocAction::class);
        $app->get('/doc/{version}/PublicAPI[/{path:.*}]', LegacyPublicAPIAction::class);
        $app->get('/doc/{version}/{document}', DocAction::class);
        
        $app->get('/market', MarketAction::class);
        $app->get('/market/{key}[/{version}]', ProductAction::class);

        $app->get('/portal[/{version}[/{topic}]]', PortalAction::class);
        
        $app->get('/installation', InstallationAction::class);
        $app->get('/tutorial', TutorialAction::class);
        $app->get('/tutorial/getting-started[/{name}/step-{stepNr}]', TutorialGettingStartedAction::class);
        $app->get('/team', TeamAction::class);
        $app->get('/support', SupportAction::class);
        $app->get('/search', SearchAction::class);

        $app->get('/api/currentRelease', ApiCurrentRelease::class);
        $app->get('/status', StatusApi::class);

        $app->get('/sitemap.xml', SitemapAction::class);

        $app->get('/news[/{version}]', NewsAction::class);

        $app->get('/community', CommunityAction::class);        
    }

    private function installErrorHandling()
    {
        $container = $this->app->getContainer();
        $errorMiddleware = $this->app->addErrorMiddleware(true, true, true);
        $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
            $response = new Response();
            return $container->get('view')
                ->render($response, 'templates/error/404.html')
                ->withStatus(404);
        });
        
        if (!Config::isDevOrTestEnv())
        {
            $errorMiddleware->setDefaultErrorHandler(function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
                $response = new Response();
                $data = ['message' => $exception->getMessage()];
                return $container->get('view')
                ->render($response, 'templates/error/500.html', $data)
                ->withStatus(500);
            });
        }
    }
}
