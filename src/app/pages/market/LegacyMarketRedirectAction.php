<?php

namespace app\pages\market;

use Slim\Psr7\Request;
use app\domain\util\Redirect;

class LegacyMarketRedirectAction
{

  public function __invoke(Request $request, $response, $args)
  {
    $path = $args['path'] ?? '';
    if (!empty($path)) {
      $path = '/' . $path;
    }
    $url = "https://market.axonivy.com" . $path;
    return Redirect::to($response, $url);
  }
}
