<?php

namespace app\redirect;

use app\domain\util\Redirect;

class TutorialAction
{

  public function __invoke($request, $response, $args)
  {
    return Redirect::to($response, "https://www.axonivy.com/tutorials");
  }
}
