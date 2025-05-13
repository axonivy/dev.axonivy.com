<?php

namespace app\pages\download;

use Slim\Views\Twig;

class DownloadRobotsAction
{
  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    return $this->view->render($response, 'download/robots.twig')
                ->withHeader('Content-Type', 'text/plain');
  }
}
