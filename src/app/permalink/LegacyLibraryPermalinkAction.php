<?php

namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use app\domain\util\Redirect;

class LegacyLibraryPermalinkAction
{
  public function __invoke($request, $response, $args)
  {
    $version = $args['version'];
    if (empty($version)) {
      throw new HttpNotFoundException($request);
    }
    $name = $args['name'] ?? ''; // e.g demo-app.zip
    if (!empty($name)) {
      $path = '/' . $name;
    }
    $url = "https://market.axonivy.com/permalink/lib/" . $version . $path;
    return Redirect::to($response, $url);
  }
}
