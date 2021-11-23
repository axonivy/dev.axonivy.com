<?php

namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use app\domain\market\Market;
use app\domain\market\MarketInstallCounter;
use Slim\Psr7\Request;

class ProductJsonAction
{
  public function __invoke(Request $request, $response, $args)
  {
    $key = $args['key'] ?? '';
    $product = Market::getProductByKey($key);
    if ($product == null) {
      throw new HttpNotFoundException($request);
    }

    $version = $args['version'] ?? '';
    if (empty($version)) {
      throw new HttpNotFoundException($request);
    }

    MarketInstallCounter::incrementInstallCount($key);
    $content = $product->getProductJsonContent($version);
    $content = str_replace('${version}', $version, $content);
    
    $json = json_decode($content);
    $json->name = $product->getName();
    $content = json_encode($json);

    $response->getBody()->write($content);
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }
}
