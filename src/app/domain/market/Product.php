<?php

namespace app\domain\market;

use app\Config;
use app\domain\Version;

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
  private bool $validate;
  private bool $contactUs;

  private array $readMeParts;
  private int $installationCount;

  private ?MavenProductInfo $mavenProductInfo;

  public function __construct(string $key, string $path, string $name, string $version, string $shortDesc, bool $listed, 
    string $type, array $tags, string $vendor, string $platformReview, string $cost, string $sourceUrl, string $statusBadgeUrl, string $language, string $industry,
    string $compatibility, ?MavenProductInfo $mavenProductInfo, bool $validate, bool $contactUs)
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
    $this->mavenProductInfo = $mavenProductInfo;
    $this->validate = $validate;
    $this->contactUs = $contactUs;
  }

  public function getKey(): string
  {
    return $this->key;
  }

  public function isListed(): bool
  {
    return $this->listed;
  }

  public function toValidate(): bool
  {
    return $this->validate;
  }

  public function getName(): string
  {
    return $this->name;
  }
  
  public function isContactUs(): bool
  {
    return $this->contactUs;
  }

  public function getVersion(): string
  {
    if (empty($this->version)) {
      if ($this->mavenProductInfo != null) {
        $this->version = $this->mavenProductInfo->getLatestVersion() ?? '';
        $this->version = str_replace('-SNAPSHOT', '', $this->version);
      }
    }
    return $this->version;
  }

  public function getShortDescription(): string
  {
    return $this->shortDesc;
  }

  public function isInstallable(string $version): bool
  {
    $productJson = $this->getProductJsonFile($version);
    if (file_exists($productJson)) {
      return true;
    }
    return file_exists($this->getMarketFile('product.json'));
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
    if (empty($this->compatibility)) {
      if ($this->mavenProductInfo != null) {
        $this->compatibility = $this->mavenProductInfo->getOldestVersion() ?? '';
        $this->compatibility = str_replace('-SNAPSHOT', '', $this->compatibility);
        if (Version::isValidVersionNumber($this->compatibility)) {
          $version = new Version($this->compatibility);
          $this->compatibility = $version->getMinorVersion() . '+';
        }
      }
    }
    return $this->compatibility;
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
  
  public function getFirstTag(): string
  {
    if (empty($this->tags)) {
      return '';
    }
    return $this->tags[0];
  }

  public function assetBaseUrl()
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

  public function getInstallerJson(string $version): string
  {
    $artifactId = $this->getProductArtifactId();
    if (!empty($artifactId)) {
      $productFile = Config::marketCacheDirectory() . "/$this->key/$version/$artifactId/product.json";
      if (file_exists($productFile)) {
        return $this->assetBaseUrlReadme($version) . '/_product.json';
      }
    }
    return $this->assetBaseUrl() . "/_product.json?version=$version";
  }
  
  public function getProductJsonContent(string $version): string
  {
    $productJson = $this->getProductJsonFile($version);
    if (file_exists($productJson)) {
      return file_get_contents($productJson);
    }
    
    $productJson = $this->getMarketFile("product.json");
    if (file_exists($productJson)) {
      return file_get_contents($productJson);
    }
    
    return '';
  }

  public function getMetaJson(): string
  {
    return file_get_contents($this->getMarketFile("product.json"));
  }
  
  public function getProductJson(string $version): string
  {
    return file_get_contents($this->getProductJsonFile($version));
  }
  
  private function getProductJsonFile(string $version): string
  {
    return $this->getProductFile($version, 'product.json');
  }

  public function assetBaseUrlReadme($version)
  {
    $artifactId = $this->getProductArtifactId();
    if (!empty($artifactId)) {
      $readme = Config::marketCacheDirectory() . "/$this->key/$artifactId/$version/README.md";
      if (file_exists($readme)) {
        return '/market-cache/' . $this->key . "/$artifactId/" . $version;
      }
    }
    return $this->assetBaseUrl();
  }

  public function getMarketFile(string $file)
  {
    return Config::marketDirectory() . "/$this->key/" . $file;
  }

  public function getProductFile(string $version, $file): string
  {
    $artifactId = $this->getProductArtifactId();
    if (!empty($artifactId)) {
      $productFile = Config::marketCacheDirectory() . "/$this->key/$artifactId/$version/" . $file;
      if (file_exists($productFile)) {
        return $productFile;
      }
    }
    return $this->getMarketFile($file);
  }
  
  public function getProductArtifactId(): string {
    $info = $this->getMavenProductInfo();
    if ($info == null) {
      return "";
    }
    
    $artifact = $info->getProductArtifact();
    if ($artifact == null) {
      return "";
    }
    
    return $artifact->getArtifactId();
  }

  public function getMavenProductInfo(): ?MavenProductInfo
  {
    return $this->mavenProductInfo;
  }
  
  public function getReasonWhyNotInstallable(bool $isDesignerRequest, string $version): string
  {
    if (!$isDesignerRequest) {
      return "You need to open then Axon Ivy Market in the Axon Ivy Designer.";
    }
    
    if (!$this->isInstallable($version)) {
      return "Product in version $version is not installable.";
    }

    return '';
  }
}
