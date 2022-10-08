<?php
namespace app\domain\listing;

use GuzzleHttp\Client;
use DOMDocument;

class BuildJobUrlCrawler
{
  private String $productBuildUrl;

  public function __construct(String $productBuildUrl)
  {
    libxml_use_internal_errors(true);
    $this->productBuildUrl = $productBuildUrl;
  }

  public function crawl(): array
  {
    $client = new Client();
    $response = $client->get($this->productBuildUrl);
    $content = $response->getBody();

    $dom = new DOMDocument();
    $dom->loadHTML($content);
    return $this->parse($dom);
  }

  public function parse(DOMDocument $dom): array {
    $urls = [];
    $child_elements = $dom->getElementsByTagName('a');
    foreach ($child_elements as $child) {
      $title = $child->getAttribute('title');
      $href = $child->getAttribute('href');
      if (str_contains($title, "master") || str_contains($title, "release")) {
        $urls[] = $this->productBuildUrl . $href . "lastSuccessfulBuild/";
      }
    }
    return $urls;
  }
}
