<?php
namespace app\domain\market;

class OpenAPIProvider
{
  private Product $product;
  
  function __construct(Product $product)
  {
    $this->product = $product;
  }
  
  public function getOpenApiJsonUrl(string $version): string
  {
    $url = $this->openApiUrl($version);
    if (empty($url)) {
      return '';
    }

    if (filter_var($url, FILTER_VALIDATE_URL)) {
      return urlencode($url);
    } else if (! empty($url) && file_exists($this->product->getProductFile($version, $url))) {
      if (empty($version)) {
        return $this->product->assetBaseUrl() . "/openapi";
      }
      return $this->product->assetBaseUrl() . "/" . $version . "/openapi";
    }
    return "";
  }
  
  public function getOpenApiJson(string $version): string
  {
    $url = $this->openApiUrl($version);
    if (empty($url)) {
      return '';
    }
    $file = $this->product->getProductFile($version, $url);
    if (file_exists($file)) {
      return file_get_contents($file);
    }
    return "";
  }
  
  private function openApiUrl(string $version): string
  {
    $content = $this->product->getProductJsonContent($version);
    $json = json_decode($content);
    return $json->properties->openApiUrl ?? '';
  }
}
