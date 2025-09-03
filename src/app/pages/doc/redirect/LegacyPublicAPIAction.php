<?php

namespace app\pages\doc\redirect;

use Slim\Psr7\Response;
use app\domain\util\Redirect;
use app\domain\doc\DocProvider;
use Slim\Psr7\Request;

class LegacyPublicAPIAction
{
  public function __invoke(Request $request, Response $response, $args)
  {
    $requestUri = $request->getUri()->__toString();
    $newUri = str_replace('PublicAPI', DocProvider::DEFAULT_LANGUAGE . '/' . 'public-api', $requestUri);
    return Redirect::to($response, $newUri);
  }
}
