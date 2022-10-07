<?php

namespace app\pages\home;

use Slim\Views\Twig;
use GuzzleHttp\Client;

class HomeAction
{
  const PRODUCT_URLS = [
    "https://jenkins.ivyteam.io/job/core_product/",
    "https://jenkins.ivyteam.io/job/core-7_product/"
  ];

  private Twig $view;

  public function __construct(Twig $view)
  {
    libxml_use_internal_errors(true);
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    $urls = $this->productBuildUrls();
    $groups = $this->groups($urls);
    return $this->view->render($response, 'home/home.twig', [
      'groups' => $groups
    ]);
  }

  private function productBuildUrls(): array
  {
    $urls = [];
    foreach (self::PRODUCT_URLS as $u) {
      $urls = array_merge($urls, (new ProductUrlCrawler())->crawl($u));
    }
    return $urls;
  }

  private function groups(array $urls): array
  {
    $groups = [];
    foreach ($urls as $url) {
      $group = (new Collector())->get($url);
      if ($group != null) {
        $groups[] = $group;
      }
    }
    usort($groups, fn(Group $a, Group $b) => strcmp($b->getText(), $a->getText()));
    return $groups;
  }
}

class ProductUrlCrawler
{
  public function crawl(String $url): array
  {
    $client = new Client([
      'timeout'  => 2.0,
    ]);
    $response = $client->get($url);
    $content = $response->getBody();
    $dom = new \DOMDocument();
    $dom->loadHTML($content);
    $urls = [];
    $child_elements = $dom->getElementsByTagName('a');
    foreach ($child_elements as $child) {
      $title = $child->getAttribute('title');
      $href = $child->getAttribute('href');
      if (str_contains($title, "master") || str_contains($title, "release")) {
        $urls[] = $url . $href . "lastSuccessfulBuild/";
      }
    }
    return $urls;
  }
}

class Collector {

  public function get(string $crawlUrl): ?Group
  {
    $client = new Client([
      'timeout'  => 2.0,
    ]);
    $response = $client->get($crawlUrl, ['http_errors' => false]);
    if ($response->getStatusCode() == 404) {
      return null;
    }
    $content = $response->getBody();
    $dom = new \DOMDocument();
    $dom->loadHTML($content);
    $engineLinks = [];
    $child_elements = $dom->getElementsByTagName('a');
    foreach ($child_elements as $child) {
      $href = $child->getAttribute('href');
      if (str_contains($href, "AxonIvy") && str_ends_with($href, '.zip') && !str_contains($href, "Repository")) {
        $text = basename($href);
        $url = $crawlUrl . $href;
        $link = new EngineLink($text, $url);
        $engineLinks[] = $link;
      }
    }

    $name = basename(dirname(str_replace("%252F", "/", $crawlUrl)));
    return new Group($name, $crawlUrl, $engineLinks);
  }
}

class Group {

  private String $text;
  private String $link;
  private array $links;
  
  public function __construct(String $text, String $link, array $links)
  {
    $this->text = $text;
    $this->link = $link;
    $this->links = $links;
  }

  public function getText() : String {
    return $this->text;
  }

  public function getLink() : String {
    return $this->link;
  }

  public function getLinks() : array {
    return $this->links;
  }
}

class EngineLink {

  private String $text;
  private String $url;
  
  public function __construct(String $text, String $url)
  {
    $this->text = $text;
    $this->url = $url;
  }

  public function getText() : String {
    return $this->text;
  }

  public function getUrl() : String {
    return $this->url;
  }
}
