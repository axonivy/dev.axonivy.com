<?php

namespace app\pages\github;

use Slim\Views\Twig;

class GitHubAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    return $this->view->render($response, 'github/github.twig');
  }
}
