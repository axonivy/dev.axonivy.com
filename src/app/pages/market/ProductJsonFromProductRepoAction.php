<?php

namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use app\domain\market\Market;
use app\domain\market\MarketInstallCounter;
use Slim\Psr7\Request;
use app\domain\market\Product;

class ProductJsonFromProductRepoAction
{
  public function __invoke(Request $request, $response, $args)
  {
    $key = $args['key'] ?? '';
    $product = Market::getProductByKey($key);
    if ($product == null) {
      throw new HttpNotFoundException($request, 'product does not exist');
    }

    $version = $args['version'] ?? '';
    if (empty($version)) {
      throw new HttpNotFoundException($request, 'version is empty');
    }
    
    $info = $product->getMavenProductInfo();
    if ($info == null) {
      throw new HttpNotFoundException($request, 'product is not versionized');
    }
    
    if (!in_array($version, $info->getVersions())) {
      throw new HttpNotFoundException($request, 'version does not exist');
    }

    return self::exec($product, $version, $response);
  }
  
  public static function exec(Product $product, string $version, $response)
  {
    MarketInstallCounter::incrementInstallCount($product->getKey());
    $content = $product->getProductJsonContent($version);
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
