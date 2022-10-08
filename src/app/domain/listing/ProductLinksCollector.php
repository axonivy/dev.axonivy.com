<?php
namespace app\domain\listing;

use GuzzleHttp\Client;
use DOMDocument;
use app\domain\listing\model\Group;
use app\domain\listing\model\ProductLink;

class ProductLinksCollector {

  private String $buildJobUrl;

  public function __construct(String $buildJobUrl)
  {
    libxml_use_internal_errors(true);
    $this->buildJobUrl = $buildJobUrl;
  }

  public function get(): ?Group
  {
    $client = new Client();
    $response = $client->get($this->buildJobUrl, ['http_errors' => false]);
    if ($response->getStatusCode() == 404) {
      return null;
    }
    $content = $response->getBody();
    $dom = new DOMDocument();
    $dom->loadHTML($content);
    
    $productLinks = $this->parse($dom);
    $name = $this->name();
    return new Group($name, $this->buildJobUrl, $productLinks);
  }

  public function parse(DOMDocument $dom): array {
    $productLinks = [];
    $child_elements = $dom->getElementsByTagName('a');
    foreach ($child_elements as $child) {
      $href = $child->getAttribute('href');
      if (str_contains($href, "AxonIvy") && str_ends_with($href, '.zip') && !str_contains($href, "Repository")) {
        $text = basename($href);
        $url = $this->buildJobUrl . $href;
        $link = new ProductLink($text, $url);
        $productLinks[] = $link;
      }
    }
    return $productLinks;
  }

  public function name(): String {
    return basename(dirname(str_replace("%252F", "/", $this->buildJobUrl)));
  }
}
