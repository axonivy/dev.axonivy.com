<?php
namespace app;

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

use app\team\TeamAction;
use app\release\AddonsAction;
use app\release\ArchiveAction;
use app\release\DownloadAction;
use app\release\MavenArchiveAction;
use app\support\SupportAction;
use app\codecamp\CodeCampAction;
use app\devday\DevDayAction;
use app\tutorial\TutorialAction;
use app\tutorial\TutorialGettingStartedAction;
use app\doc\DocAction;
use app\installation\InstallationAction;
use app\feature\FeatureAction;
use app\search\SearchAction;
use app\release\NightlyAction;
use app\release\SprintReleaseAction;

define('MAVEN_SUPPORTED_RELEASES_SINCE_VERSION', '6.0.0');
define('CDN_HOST', 'https://download.axonivy.com');
define('CDN_HOST_DEV_RELEASES', 'https://d3ao4l46dir7t.cloudfront.net');
define('IVY_RELEASE_DIRECTORY', '/home/axonivya/www/developer.axonivy.com' . DIRECTORY_SEPARATOR . 'releases' . DIRECTORY_SEPARATOR . 'ivy');
define('IVY_NIGHTLY_RELEASE_DIRECTORY', '/home/axonivya/www/developer.axonivy.com' . DIRECTORY_SEPARATOR . 'dev-releases' . DIRECTORY_SEPARATOR . 'ivy' . DIRECTORY_SEPARATOR . 'nightly' . DIRECTORY_SEPARATOR . 'current');
define('IVY_SPRINT_RELEASE_DIRECTORY', '/home/axonivya/www/developer.axonivy.com' . DIRECTORY_SEPARATOR . 'dev-releases' . DIRECTORY_SEPARATOR . 'ivy' . DIRECTORY_SEPARATOR . 'sprint-release' . DIRECTORY_SEPARATOR . 'Jakobshorn' . DIRECTORY_SEPARATOR . '7.1.0-S8');

class Website
{
    private $app;
    
    function __construct()
    {
        $config = [
            'settings' => [
              'displayErrorDetails' => true,
              'debug' => true,
            ],
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
        $app->get('/download/archive[/{version}]', ArchiveAction::class)->setName('archive');
        $this->installRedirect('/download/archive.html', 'archive');
        $app->get('/download/sprint-release[.html]', SprintReleaseAction::class);
        $app->get('/download/nightly[.html]', NightlyAction::class);
        $app->get('/download/addons', AddonsAction::class)->setName('addons');
        $this->installRedirect('/download/addons.html', 'addons');
        $app->get('/download/maven.html', MavenArchiveAction::class);
        
        $app->get('/doc/{version}', DocAction::class);
        $app->get('/installation', InstallationAction::class);
        $app->get('/tutorial', TutorialAction::class);
        $app->get('/tutorial/getting-started[/{name}/step-{stepNr}]', TutorialGettingStartedAction::class);
        $app->get('/team', TeamAction::class);
        $app->get('/support', SupportAction::class);
        $app->get('/codecamp[/{year}]', CodeCampAction::class);
        $app->get('/devday[/{year}]', DevDayAction::class);
        $app->get('/search', SearchAction::class);
    }

    private function installRedirect($oldPath, $pathFor)
    {
        $app = $this->app;
        $app->get($oldPath, function ($request, Response $response, $args) use ($pathFor) {
            $uri = $request->getUri()->withPath($this->router->pathFor($pathFor));
            return $response->withRedirect($uri, 301);
        });
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

