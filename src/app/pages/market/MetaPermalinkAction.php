<?php

namespace app\pages\market;

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use app\domain\util\Redirect;

class MetaPermalinkAction
{
  public function __invoke(Request $request, Response $response, array $args)
  {
    $product = $args['key'];
    return Redirect::permanentTo($response, "/_market/$product/_meta.json");
  }
}
