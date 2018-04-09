<?php
namespace app;

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

use app\team\TeamAction;
use app\release\AddonsAction;
use app\release\ArchiveAction;
use app\release\DownloadAction;
use app\support\SupportAction;
use app\codecamp\CodeCampAction;
use app\devday\DevDayAction;
use app\tutorial\TutorialAction;
use app\tutorial\TutorialGettingStartedAction;
use app\doc\DocAction;
use app\installation\InstallationAction;
use app\feature\FeatureAction;
use app\search\SearchAction;

class Website
{
    private $app;
    
    function __construct()
    {
        $config = [
            'settings.displayErrorDetails' => true,
            'log.enabled' => true,
            'log.path' => '../logs',
            'log.level' => 8,
            'log.writer' => new \Slim\Logger\DateTimeFileWriter(),
        ];
        $this->app = new App($config);
    }

    public function start()
    {
        $this->configureTemplateEngine();
        $this->installTrailingSlashMiddelware();
        $this->installRoutes();
        $this->installErrorHandling();
        $this->app->run();
    }
    
    private function configureTemplateEngine()
    {
        $container = $this->app->getContainer();
        $container['view'] = function ($container) {
            $view = new \Slim\Views\Twig('../../src');
            $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
            $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));
            $view->addExtension(new \Twig_Extension_Debug());
            return $view;
        };
    }
    
    /**
     * permanently redirect paths with a trailing slash to their non-trailing counterpart
     */
    private function installTrailingSlashMiddelware()
    {
        $this->app->add(function (Request $request, Response $response, callable $next) {
            $uri = $request->getUri();
            $path = $uri->getPath();
            if ($path != '/' && substr($path, -1) == '/') {
                $uri = $uri->withPath(substr($path, 0, -1));
                if ($request->getMethod() == 'GET') {
                    return $response->withRedirect((string)$uri, 301);
                } else {
                    return $next($request->withUri($uri), $response);
                }
            }
            return $next($request, $response);
        });
    }

    private function installRoutes()
    {
        $app = $this->app;
        $app->get('/', FeatureAction::class);
        $app->get('/download', DownloadAction::class);
        $app->get('/archive[/{version}]', ArchiveAction::class);
        $app->get('/addons', AddonsAction::class);
        $app->get('/doc', DocAction::class);
        $app->get('/installation', InstallationAction::class);
        $app->get('/tutorial', TutorialAction::class);
        $app->get('/tutorial/getting-started[/{name}/step-{stepNr}]', TutorialGettingStartedAction::class);
        $app->get('/team', TeamAction::class);
        $app->get('/support', SupportAction::class);
        $app->get('/codecamp[/{year}]', CodeCampAction::class);
        $app->get('/devday[/{year}]', DevDayAction::class);
        $app->get('/search', SearchAction::class);
    }

    private function installErrorHandling()
    {
        $container = $this->app->getContainer();
        
        $container['notFoundHandler'] = function ($c) {
            return function ($request, $response) use ($c) {
                return $c['view']->render($response, 'templates/error/404.html');
            };
        };
        
        $container['errorHandler'] = function ($c) {
            return function ($request, $response, $exception) use ($c) {
                return $c['view']->render($response, 'templates/error/500.html', ['message' => $exception->getMessage()]);
            };
        };
    }
    
    private static function createSimpleRenderFunction(string $template): callable {
        return function ($request, $response, $args) use ($template) {
            return $this->view->render($response, $template);
        };
    }
}

