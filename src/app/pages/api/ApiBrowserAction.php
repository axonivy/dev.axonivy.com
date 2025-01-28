<?php

namespace app\pages\api;

use Slim\Psr7\Response;
use Slim\Views\Twig;

/**
 * Used in:
 * - core documentation
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
    $this->view->getEnvironment()->addGlobal('SWAGGER_VERSION', "5.18.2");

    // integrity taken from https://www.srihash.org/
    $this->view->getEnvironment()->addGlobal('CSS_INTEGRITY', 
      "sha512-Fx2bx472ykst5EwyqNnGgXC2pPBxuxRnxHSa5Elf7sVbYA1vj2M/J50eJ0aXDal5hDjdSl3EEaQCaO5y69HmcQ==");
    $this->view->getEnvironment()->addGlobal('BUNDLE_INTEGRITY', 
      "sha512-J8sV3czWF0DcwmhzNrUbzjxvu3KefHg9Sn6YweslZnSsRFrLqx/y/ePkiiLvppzgwM73KjBt5G7xQ6kxEvvdvA==");
    $this->view->getEnvironment()->addGlobal('PRESET_INTEGRITY', 
      "sha512-qvzEUMlxl6BHnALvxzMNZhtG6Ygu6K9j4kDefViA/+Ht++/N8nTBA+HnI4qaUj8SfyjBf11PhW5nxMdZTDm5Og==");

    return $this->view->render($response, 'api/api.twig');
  }
}
