<?php

namespace app;

use DI\Container;
use Middlewares\TrailingSlash;
use Slim\App;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;
use DI\ContainerBuilder;

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
    $errorMiddleware = $this->app->addErrorMiddleware(true, true, true);
    $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function () {
        $response = new Response(404);
        $response->getBody()->write(file_get_contents(__DIR__ . '/../web/astro/404.html'));
        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
      }
    );
  }
}
