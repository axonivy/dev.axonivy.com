<?php

namespace app\domain\util;

use Slim\Psr7\Response;

class Redirect
{
  public static function to(Response $response, $location)
  {
    return $response->withHeader('Location', $location)->withStatus(302);
  }
}
