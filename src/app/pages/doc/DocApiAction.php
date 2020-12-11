<?php

namespace app\pages\doc;

use Slim\Psr7\Response;
use Slim\Views\Twig;
class DocApiAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, Response $response, $args)
  {
    return $this->view->render($response, 'doc/api.twig', [
    ]);
  }

}
