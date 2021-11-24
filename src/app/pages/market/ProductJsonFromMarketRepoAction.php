<?php

namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use app\domain\market\Market;
use app\domain\market\MarketInstallCounter;
use Slim\Psr7\Request;

class ProductJsonFromMarketRepoAction
{
  public function __invoke(Request $request, $response, $args)
  {
    $key = $args['key'] ?? '';
    $product = Market::getProductByKey($key);
    if ($product == null) {
      throw new HttpNotFoundException($request);
    }

    MarketInstallCounter::incrementInstallCount($key);
    $version = $request->getQueryParams()['version'] ?? 'version-get-param-missing';
    $content = $product->getProductJsonContent('');
    $content = str_replace('${version}', $version, $content);
    
    if (empty($content)) {
      $content = "{}";
    }
    $json = json_decode($content);
    $json->name = $product->getName();
    $content = json_encode($json);

    $response->getBody()->write($content);
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }
}
