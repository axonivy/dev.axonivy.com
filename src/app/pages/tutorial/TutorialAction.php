<?php

namespace app\pages\tutorial;

use Slim\Views\Twig;
use app\domain\util\Redirect;

class TutorialAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    return Redirect::to($response, "https://www.axonivy.com/tutorials");
  }
}
