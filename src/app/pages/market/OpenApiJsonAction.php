<?php

namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use app\domain\market\Market;
use Slim\Psr7\Request;

class OpenApiJsonAction
{
  public function __invoke(Request $request, $response, $args)
  {
    $key = $args['key'] ?? '';
    $product = Market::getProductByKey($key);
    if ($product == null) {
      throw new HttpNotFoundException($request);
    }
    
    $content = $product->getOpenApiJson($request);
    if (empty($content))
    {
      throw new HttpNotFoundException($request);
    }

    $response->getBody()->write($content);
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }

}
