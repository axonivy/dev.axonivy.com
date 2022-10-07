<?php

namespace app;

use DI\Container;
use Middlewares\TrailingSlash;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use DI\ContainerBuilder;
use app\pages\home\HomeAction;
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
    $builder->addDefinitions([
      Twig::class => Twig::create(__DIR__ . '/../app/pages')
    ]);
    return $builder->build();
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
    $this->app->get('/', HomeACtion::class);
  }

  private function installErrorHandling()
  {
    $container = $this->app->getContainer();
    $errorMiddleware = $this->app->addErrorMiddleware(true, true, true);
    $errorMiddleware->setErrorHandler(HttpNotFoundException::class, function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
      $response = new Response();
      $data = ['message' => $exception->getMessage()];
      return $container->get(Twig::class)
        ->render($response, '_error/404.twig', $data)
        ->withStatus(404);
    });

    $errorMiddleware->setDefaultErrorHandler(function (ServerRequestInterface $request, Throwable $exception, bool $displayErrorDetails) use ($container) {
      $response = new Response();
      $data = ['message' => $exception->getMessage()];
      return $container->get(Twig::class)
          ->render($response, '_error/500.twig', $data)
          ->withStatus(500);
    });
  }
}
