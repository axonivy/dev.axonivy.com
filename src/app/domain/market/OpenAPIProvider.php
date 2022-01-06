<?php
namespace app\domain\market;

class OpenAPIProvider
{
  private Product $product;
  
  function __construct(Product $product)
  {
    $this->product = $product;
  }
  
  public function getOpenApiUrl(string $version): string
  {
    $url = $this->getOpenApiFile($version);
    if (empty($url)) {
      return '';
    }

    if (filter_var($url, FILTER_VALIDATE_URL)) {
      return urlencode($url);
    } else if (!empty($url) && file_exists($url)) {
      $fileName = substr($url, strrpos($url, '/') + 1);
      return $this->product->assetBaseUrl($version) . "/$fileName";
    }
    return "";
  }
  
  public function getOpenApiContent(string $version): string
  {
    $file = $this->getOpenApiFile($version);
    if (empty($file)) {
      return '';
    }
    if (file_exists($file)) {
      return file_get_contents($file);
    }
    return "";
  }
  
  public function getOpenApiFile(string $version): string
  {
    // auto detect openapi.*
    $defaultFile = 'openapi.*';
    $openApiFile = glob($this->product->getProductFile($version, $defaultFile));
    if (!empty($openApiFile) && file_exists($openApiFile[0])) {
      return $openApiFile[0];
    }

    // read from product.json
    $content = $this->product->getProductJsonContent($version);
    $json = json_decode($content);
    return $json->properties->openApiUrl ?? '';
  }
}

