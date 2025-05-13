<?php

namespace app;

use DI\Container;
use Middlewares\TrailingSlash;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\ReleaseInfo;
use app\domain\ReleaseType;
use DI\ContainerBuilder;
use Throwable;

class Website
{
  private $app;

  function __construct()
  {
    $container = $this->createDiContainer();
    $this->app = AppFactory::createFromContainer($container);
    $this->configureTemplateEngine();
    $this->installTrailingSlashRedirect();
    $this->installRoutes();
    $this->installErrorHandling();
  }

  private function createDiContainer(): Container
  {
    $builder = new ContainerBuilder();
    $builder->addDefinitions([
      Twig::class => Twig::create(__DIR__ . '/../app/pages')
    ]);
    return $builder->build();
  }

  public function getApp(): App
  {
    return $this->app;
  }

  public function start()
  {
    $this->app->run();
  }

  private function configureTemplateEngine(): Twig
  {
    $container = $this->app->getContainer();
    $view = $container->get(Twig::class);

    $releaseTypeLTS = ReleaseType::LTS();
    $releaseTypeLE = ReleaseType::LE();

    $versionLTS = $this->getDisplayVersion($releaseTypeLTS->releaseInfo());
    $leRelease = $this->getDisplayVersion($releaseTypeLE->releaseInfo());

    $text = $versionLTS;
    $textLong = $releaseTypeLTS->shortName() . " $versionLTS";
    if (!empty($leRelease)) {
      $text .= " / $leRelease";
      $textLong .= " / " . $releaseTypeLE->shortName() . " $leRelease";
    }
    $view->getEnvironment()->addGlobal('CURRENT_VERSION_DOWNLOAD', $text);
    $view->getEnvironment()->addGlobal('CURRENT_VERSION_DOWNLOAD_LONG', $textLong);

    $view->getEnvironment()->addGlobal('PRODUCTIVE_SYSTEM', Config::isProductionEnvironment());

    $view->getEnvironment()->addGlobal('BASE_URL', $this->baseUrl());

    return $view;
  }

  private function baseUrl()
  {
    if (isset($_SERVER['HTTPS'])) {
      $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    } else {
      $protocol = 'http';
    }
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return $protocol . "://" . $host;
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
    RoutingRules::installRoutes($this->app);
  }

  private function installErrorHandling()
  {
    $container = $this->app->getContainer();
    $errorMiddleware = $this->app->addErrorMiddleware(true, true, true);
    $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
      $response = new Response();
      $data = ['message' => $exception->getMessage()];
      $useragent = $request->getHeaderLine('User-Agent');
      $fileName = str_contains($useragent, 'CloudFront') ? '_error/404-empty.twig' : '_error/404.twig';
      return $container->get(Twig::class)
        ->render($response, $fileName, $data)
        ->withStatus(404);
    });

    if (Config::isProductionEnvironment()) {
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
