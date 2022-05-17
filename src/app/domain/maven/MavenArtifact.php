<?php

namespace app\domain\maven;

use app\domain\util\StringUtil;
use app\Config;
use app\domain\market\Product;
use GuzzleHttp\Client;

class MavenArtifact
{
  private $key;

  private $name;

  private string $repoUrl;
  
  private $groupId;

  private $artifactId;

  private $type;

  private $versionCache = null;

  private $makesSenseAsMavenDependency;

  private $isDocumentation;
  
  function __construct($key, $name, string $repoUrl, $groupId, $artifactId, $type, bool $makesSenseAsMavenDependency, bool $isDocumentation)
  {
    $this->key = $key;
    $this->name = $name;
    $this->repoUrl = $repoUrl;
    $this->groupId = $groupId;
    $this->artifactId = $artifactId;
    $this->type = $type;
    $this->makesSenseAsMavenDependency = $makesSenseAsMavenDependency;
    $this->isDocumentation = $isDocumentation;
  }

  public static function create(string $key): MavenArtifactBuilder
  {
    return new MavenArtifactBuilder($key);
  }

  public function getKey(): string
  {
    return $this->key;
  }
  
  public function getRepoUrl(): string
  {
    return $this->repoUrl;
  }
  
  public function getGroupId(): string
  {
    return $this->groupId;
  }

  public function getArtifactId(): string
  {
    return $this->artifactId;
  }
  
  public function isProductArtifact(): bool
  {
    return StringUtil::endsWith($this->getArtifactId(), '-product');
  }

  public function getType(): string
  {
    return $this->type;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getMakesSenseAsMavenDependency(): bool
  {
    return $this->makesSenseAsMavenDependency;
  }

  public function isDocumentation(): bool
  {
    return $this->isDocumentation;
  }

  public function getDocUrl(Product $product, string $version)
  {
    return '/market-cache/' . $product->getKey() . '/' . $this->artifactId . '/' . $version;
  }

  public function getDevUrl()
  {
    $versions = $this->getVersions();
    if (empty($versions)) {
      return "";
    }
    return $this->getUrl($versions[0]);
  }

  public function getUrl($version)
  {
    $concretVersion = $this->getConcreteVersion($version);
    $baseUrl = $this->getBaseUrl();
    return $baseUrl . '/' . $version . '/' . $this->artifactId . '-' . $concretVersion . '.' . $this->type;
  }

  public function getConcreteVersion($version)
  {
    if (StringUtil::contains($version, 'SNAPSHOT')) {
      $baseUrl = $this->getBaseUrl();
      $xml = HttpRequester::request("$baseUrl/$version/maven-metadata.xml");
      if (empty($xml)) {
        return "";
      }
      return self::parseVersionIdentifierFromXml($xml);
    }
    return $version;
  }

  public static function parseVersionIdentifierFromXml(string $xml): string
  {
    $element = new \SimpleXMLElement($xml);
    $result = $element->xpath('/metadata/versioning/snapshotVersions/snapshotVersion');
    return $result[0]->value;
  }

  private function getBaseUrl()
  {
    $groupId = str_replace('.', '/', $this->groupId);
    return $this->repoUrl . "$groupId/" . $this->artifactId;
  }

  public function getPermalinkDev()
  {
    return '/permalink/lib/dev/' . $this->key . '.' . $this->type;
  }

  public function getVersions(): array
  {
    if ($this->versionCache == null) {
      $baseUrl = $this->getBaseUrl();

      $xml = HttpRequester::request("$baseUrl/maven-metadata.xml");

      if (empty($xml)) {
        $this->versionCache = [];
        return $this->versionCache;
      }

      $v = self::parseVersions($xml);

      usort($v, 'version_compare');
      $v = array_reverse($v);
      $v = self::filterSnapshotsWhichAreRealesed($v);      
      $this->versionCache = $v;
    }
    return $this->versionCache;
  }
  
  public static function filterSnapshotsWhichAreRealesed(array $versions): array
  {
    return array_values(array_filter($versions, fn($version) => self::filterReleasedSnapshots($versions, $version)));
  }
  
  private static function filterReleasedSnapshots(array $versions, string $v): bool
  {
    if (StringUtil::endsWith($v, '-SNAPSHOT')) {
      $relasedVersion = str_replace('-SNAPSHOT', '', $v);
      if (in_array($relasedVersion, $versions)) {
        return false;
      }
    }
    return true;
  }

  public static function parseVersions($xml)
  {
    $element = new \SimpleXMLElement($xml);
    $result = $element->xpath('/metadata/versioning/versions');
    $versions = get_object_vars($result[0]->version);
    return array_values($versions);
  }
}

/* caching on request scope */
class HttpRequester
{
  private static $cache = [];

  static function request($url)
  {
    // prevent metadata requests to CDN (maven.axonivy.com) - cache last too long.
    $url = str_replace("https://maven.axonivy.com/", "https://nexus-mirror.axonivy.com/repository/maven/", $url);
    if (!isset(self::$cache[$url])) {
      $client = new Client();
      $res = $client->request('GET', $url);
      $content = '';
      if ('200' == $res->getStatusCode()) {
        $content = $res->getBody();
      }
      self::$cache[$url] = $content;
    }
    return self::$cache[$url];
  }
}

class MavenArtifactBuilder
{
  private $key;
  private string $repoUrl = Config::MAVEN_ARTIFACTORY_URL;
  private $name;
  private $groupId;
  private $artifactId;
  private $type = 'iar';
  private $makesSenseAsMavenDependency = false;
  private $isDocumentation = false;

  public function __construct($key)
  {
    $this->key = $key;
  }
  
  public function repoUrl(string $repoUrl): MavenArtifactBuilder
  {
    if (!StringUtil::endsWith($repoUrl, '/'))
    {
      $repoUrl = $repoUrl . '/';
    }
    $this->repoUrl = $repoUrl;
    return $this;
  }

  public function name(string $name): MavenArtifactBuilder
  {
    $this->name = $name;
    return $this;
  }

  public function groupId(string $groupId): MavenArtifactBuilder
  {
    $this->groupId = $groupId;
    return $this;
  }

  public function artifactId(string $artifactId): MavenArtifactBuilder
  {
    $this->artifactId = $artifactId;
    return $this;
  }

  public function type(string $type): MavenArtifactBuilder
  {
    $this->type = $type;
    return $this;
  }

  public function makesSenseAsMavenDependency(bool $makesSenseAsMavenDependency): MavenArtifactBuilder
  {
    $this->makesSenseAsMavenDependency = $makesSenseAsMavenDependency;
    return $this;
  }

  public function doc(bool $doc): MavenArtifactBuilder
  {
    $this->isDocumentation = $doc;
    return $this;
  }

  public function build(): MavenArtifact
  {
    return new MavenArtifact(
      $this->key,
      $this->name,
      $this->repoUrl,
      $this->groupId,
      $this->artifactId,
      $this->type,
      $this->makesSenseAsMavenDependency,
      $this->isDocumentation
    );
  }
}
