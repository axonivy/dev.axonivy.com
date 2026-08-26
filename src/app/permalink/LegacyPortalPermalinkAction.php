<?php

namespace app\permalink;

use Slim\Psr7\Request;
use app\domain\util\Redirect;

class LegacyPortalPermalinkAction
{

  public function __invoke(Request $request, $response, $args)
  {
    $path = $args['path'] ?? '';
    if (!empty($path)) {
      $path = '/' . $path;
    }
    $url = "https://market.axonivy.com/portal" . $path;
    return Redirect::to($response, $url);
  }
}
