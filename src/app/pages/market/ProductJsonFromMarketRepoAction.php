<?php

namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use app\domain\market\Market;
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

    $version = $request->getQueryParams()['version'] ?? 'version-get-param-missing';
    return ProductJsonFromProductRepoAction::exec($product, $version, $response);
  }
}
