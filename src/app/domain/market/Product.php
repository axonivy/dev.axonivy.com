<?php

namespace app\domain\market;

use app\Config;

class Product
{
  private string $key;
  private string $path;

  private string $name;
  private string $shortDesc;
  private bool $listed;
  private int $sort;
  private string $type;
  private array $tags;
  private string $vendor;
  private string $costs;
  private string $sourceUrl;
  private string $language;
  private string $industry;
  private string $minVersion;
  private bool $installable;

  private array $readMeParts;

  private ?MavenProductInfo $mavenProductInfo;

  public function __construct(string $key, string $path, string $name, string $shortDesc, bool $listed, 
    int $sort, string $type, array $tags, string $vendor, string $costs, string $sourceUrl, string $language, string $industry,
    string $minVersion, bool $installable, ?MavenProductInfo $mavenProductInfo)
  {
    $this->key = $key;
    $this->path = $path;
    $this->name = $name;
    $this->shortDesc = $shortDesc;
    $this->listed = $listed;
    $this->sort = $sort;
    $this->type = $type;
    $this->tags = $tags;
    $this->vendor = $vendor;
    $this->costs = $costs;
    $this->sourceUrl = $sourceUrl;
    $this->language = $language;
    $this->industry = $industry;
    $this->minVersion = $minVersion;
    $this->installable = $installable;
    $this->mavenProductInfo = $mavenProductInfo;
    $this->readMeParts = [];
  }

  public function getKey(): string
  {
    return $this->key;
  }

  public function isListed(): bool
  {
    return $this->listed;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getShortDescription(): string
  {
    return $this->shortDesc;
  }

  public function getSort(): int
  {
    return $this->sort;
  }

  public function isInstallable(): bool
  {
    return $this->installable;
  }

  public function getVendor(): string
  {
    return $this->vendor;
  }

  public function getCosts(): string
  {
    return $this->costs;
  }

  public function getSourceUrl(): string
  {
    return $this->sourceUrl;
  }

  public function getSourceUrlDomain(): string
  {
    return parse_url($this->sourceUrl)['host'] ?? '';
  }

  public function getLanguage(): string
  {
    return $this->language;
  }

  public function getIndustry(): string
  {
    return $this->industry;
  }

  public function getMinVersion(): string
  {
    return $this->minVersion;
  }

  public function isVersionSupported(string $version): bool
  {
    return version_compare($this->minVersion, $version) <= 0;
  }

  public function getDescription(): string
  {
    $desc = $this->splitMarkdownToParts();
    return $this->getHtmlOfMarkdown($desc['description']);
  }

  public function getDemoDescription(): string
  {
    $desc = $this->splitMarkdownToParts();
    return $this->getHtmlOfMarkdown($desc['demo']);
  }

  public function getSetupDescription(): string
  {
    $desc = $this->splitMarkdownToParts();
    return $this->getHtmlOfMarkdown($desc['setup']);
  }

  public function getType(): string
  {
    return $this->type;
  }

  public function getTypeIcon(): string
  {
    foreach (Market::types() as $type) {
      if ($type->getFilter() == $this->type) {
        return $type->getIcon();
      }
    }
    return 'si-types';
  }

  public function getTags(): array
  {
    return $this->tags;
  }

  private function splitMarkdownToParts(): array
  {
    if (empty($this->readMeParts)) {
      $filename = 'README.md';
      $markdownFile = $this->path . "/$filename";
      if (file_exists($markdownFile)) {
        $markdownParts[] = [];
        $markdownContent = file_get_contents($markdownFile);

        $setupContent = explode('## Setup', $markdownContent);
        $demoContent = explode("## Demo", $setupContent[0]);
        $this->readMeParts['description'] = $demoContent[0];
        $this->readMeParts['demo'] = $demoContent[1] ?? '';
        $this->readMeParts['setup'] = $setupContent[1] ?? '';
      }
    }
    return $this->readMeParts;
  }

  private function getHtmlOfMarkdown(?string $markdownContent): string
  {
    if (empty($markdownContent)) {
      return '';
    }
    return (new ParsedownCustom($this->assetBaseUrl()))->text($markdownContent);
  }

  private function assetBaseUrl()
  {
    return '/_market/' . $this->key;
  }

  public function getImgSrc()
  {
    return $this->assetBaseUrl() . '/logo.png';
  }

  public function getUrl(): string
  {
    return '/market/' . $this->key;
  }

  public function getMetaUrl(string $version): string
  {
    return $this->assetBaseUrl() . "/_meta.json?version=$version";
  }

  public function getMetaJson(): string
  {
    return file_get_contents($this->getMarketFile("meta.json"));
  }

  public function getOpenApiJsonUrl(): string
  {
    $url = $this->evaluateOpenApiUrl();
    if (filter_var($url, FILTER_VALIDATE_URL))
    {
      return urlencode($url);
    }
    else if (!empty($url) && file_exists($this->getMarketFile($url)))
    {
      return $this->assetBaseUrl() . "/openapi";
    }
    return "";
  }

  public function getOpenApiJson(): string
  {
    $openapiFile = $this->getMarketFile($this->evaluateOpenApiUrl());
    if (file_exists($openapiFile))
    {
      return file_get_contents($openapiFile);
    }
    return "";
  }

  private function getMarketFile(string $file)
  {
    return Config::marketDirectory() . "/$this->key/" . $file;
  }

  private function evaluateOpenApiUrl(): string
  {
    if ($this->installable)
    {
      $content = $this->getMetaJson();
      $json = json_decode($content);
      foreach($json->installers as $installer)
      {
        $realInstaller = $this->evaluateInstaller($installer);
        if ($realInstaller->id == 'rest-client')
        {
          return $realInstaller->data->openApiUrl;
        }
      }
    }
    return '';
  }

  private function evaluateInstaller($installer): mixed
  {
    if (property_exists($installer, 'id')) {
      return $installer;
    }
    $externalJson = $installer->{'...'};
    $installerJson = file_get_contents($this->getMarketFile(substr($externalJson, 1, -1)));
    return json_decode($installerJson);
  }

  public function getMavenProductInfo(): ?MavenProductInfo
  {
    return $this->mavenProductInfo;
  }

  public function getReasonWhyNotInstallable(string $version): string
  {
    if (!$this->isInstallable()) {
      return 'Product is not installable.';
    } elseif (!$this->isVersionSupported($version)) {
      return 'Your Axon Ivy Designer is too old (' . $version . '). You need ' . $this->getMinVersion() . ' or newer.';
    }
    return '';
  }
}

class ParsedownCustom extends \ParsedownExtra
{
  private String $baseUrl;

  public function __construct(String $baseUrl)
  {
    $this->baseUrl = $baseUrl;
  }

  protected function inlineImage($Excerpt)
  {
    if (!isset($Excerpt['text'][1]) or $Excerpt['text'][1] !== '[') {
      return;
    }

    $Excerpt['text'] = substr($Excerpt['text'], 1);

    $Link = $this->inlineLink($Excerpt);

    if ($Link === null) {
      return;
    }

    $imageUrl = $Link['element']['attributes']['href'];
    if (!self::isAbsolute($imageUrl)) {
      $imageUrl = $this->baseUrl . "/$imageUrl";
    }

    $Inline = array(
      'extent' => $Link['extent'] + 1,
      'element' => array(
        'name' => 'img',
        'attributes' => array(
          'src' => $imageUrl,
          'alt' => $Link['element']['text'],
          'class' => 'image fit'
        ),
      ),
    );

    $Inline['element']['attributes'] += $Link['element']['attributes'];

    unset($Inline['element']['attributes']['href']);

    return $Inline;
  }

  private static function isAbsolute($uri)
  {
    return strpos($uri, '://') !== false;
  }
}
