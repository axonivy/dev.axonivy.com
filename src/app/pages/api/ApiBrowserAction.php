<?php

namespace app\pages\api;

use Slim\Psr7\Response;
use Slim\Views\Twig;

/**
 * Used in:
 * - core documentation
 * - market.axonivy.com
 */
class ApiBrowserAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, Response $response, $args)
  {
    $response = $response->withHeader('Access-Control-Allow-Origin', 'https://market.axonivy.com'); // so that swagger can open urls from market
    return $this->view->render($response, 'api/api.twig');
  }
}
