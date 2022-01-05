<?php
namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use app\domain\market\Market;
use Slim\Psr7\Request;
use app\domain\market\OpenAPIProvider;

class OpenApiAction
{

  public function __invoke(Request $request, $response, $args)
  {
    $key = $args['key'] ?? '';
    $product = Market::getProductByKey($key);
    if ($product == null) {
      throw new HttpNotFoundException($request);
    }
    
    $version = $args['version'] ?? '';

    $openApiProvider = new OpenAPIProvider($product);
    $openApiFile = $openApiProvider->getOpenApiFile($version);
    $content = $openApiProvider->getOpenApiContent($version);
    if (empty($content)) {
      throw new HttpNotFoundException($request);
    }

    $response->getBody()->write($content);
    $mimeType = mime_content_type($openApiFile);
    $response = $response->withHeader('Content-Type', $mimeType);
    return $response;
  }
}
