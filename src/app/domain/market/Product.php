<?php

namespace app\domain\market;

use app\Config;

class Product
{
  private string $key;
  private string $path;

  private string $name;
  private string $version;
  private string $shortDesc;
  private bool $listed;
  private string $type;
  private array $tags;
  private string $vendor;
  private string $platformReview;
  private string $cost;
  private string $sourceUrl;
  private string $statusBadgeUrl;
  private string $language;
  private string $industry;
  private string $compatibility;
  private bool $installable;

  private array $readMeParts;
  private int $installationCount;

  private ?MavenProductInfo $mavenProductInfo;

  public function __construct(string $key, string $path, string $name, string $version, string $shortDesc, bool $listed, 
    string $type, array $tags, string $vendor, string $platformReview, string $cost, string $sourceUrl, string $statusBadgeUrl, string $language, string $industry,
    string $compatibility, bool $installable, ?MavenProductInfo $mavenProductInfo)
  {
    $this->key = $key;
    $this->path = $path;
    $this->name = $name;
    $this->version = $version;
    $this->shortDesc = $shortDesc;
    $this->listed = $listed;
    $this->type = $type;
    $this->tags = $tags;
    $this->vendor = $vendor;
    $this->platformReview = $platformReview;
    $this->cost = $cost;
    $this->sourceUrl = $sourceUrl;
    $this->statusBadgeUrl = $statusBadgeUrl;
    $this->language = $language;
    $this->industry = $industry;
    $this->compatibility = $compatibility;
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

  public function getVersion(): string
  {
    return $this->version;
  }

  public function getShortDescription(): string
  {
    return $this->shortDesc;
  }

  public function isInstallable(): bool
  {
    return $this->installable;
  }

  public function getVendor(): string
  {
    return $this->vendor;
  }

  public function getPlatformReview(): string
  {
    return $this->platformReview;
  }

  public function getStarCount(): int
  {
    return (int) $this->platformReview;
  }

  public function getHalfStar(): bool
  {
    return (float) $this->platformReview != (float) $this->getStarCount();
  }

  public function getCost(): string
  {
    return $this->cost;
  }

  public function getSourceUrl(): string
  {
    return $this->sourceUrl;
  }

  public function getStatusBadgeUrl(): string
  {
    return $this->statusBadgeUrl;
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

  public function getCompatibility(): string
  {
    return $this->compatibility;
  }

  public function isVersionSupported(string $version): bool
  {
    if (str_ends_with($this->compatibility, '+')) {
      return version_compare(substr($this->compatibility, 0, -1), $version) <= 0;
    }
    return version_compare($this->compatibility, $version) == 0;
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

  public function getInstallationCount(): int
  {
    if (empty($this->installationCount))
    {
      $this->installationCount = MarketInstallCounter::getInstallCount($this->key);
    }
    return $this->installationCount;
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
  
  public function hasInstaller(string $installerId): bool
  {
    $installers = $this->getInstallers($installerId);
    return !empty($installers);
  }

  private function getMarketFile(string $file)
  {
    return Config::marketDirectory() . "/$this->key/" . $file;
  }

  private function evaluateOpenApiUrl(): string
  {
    $installers = $this->getInstallers('rest-client');
    if (empty($installers))
    {
      return '';
    }
    $installer = array_values($installers)[0];
    return $installer->data->openApiUrl;
  }
  
  private function getInstallers(string $installerId): array
  {
    $installers = [];
    if ($this->installable)
    {
      $content = $this->getMetaJson();
      $json = json_decode($content);
      foreach($json->installers as $installer)
      {
        $realInstaller = $this->evaluateInstaller($installer);
        if ($realInstaller->id == $installerId)
        {
            $installers[] = $realInstaller;
        }
      }
    }
    return $installers;
  }

  private function evaluateInstaller($installer)
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
      return 'Your Axon Ivy Designer is too old (' . $version . '). You need version ' . $this->getCompatibility() . '.';
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
