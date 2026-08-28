<?php

namespace app;

use DI\Container;
use Middlewares\TrailingSlash;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;
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
    $this->installTrailingSlashRedirect();
    $this->installRoutes();
    $this->installErrorHandling();
  }

  private function createDiContainer(): Container
  {
    $builder = new ContainerBuilder();    
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
    $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) {
        return new Response(404);
      }
    );
    $errorMiddleware->setDefaultErrorHandler(function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) {
        return new Response(500);
      }
    );
  }
}
