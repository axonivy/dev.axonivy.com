<?php

namespace app\pages\support;

use Slim\Views\Twig;

class SupportAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    return $this->view->render($response, 'support/support.twig');
  }
}
