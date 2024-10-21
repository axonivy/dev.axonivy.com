<?php

namespace app\permalink;

use Slim\Psr7\Request;
use Slim\Exception\HttpNotFoundException;
use app\domain\util\Redirect;
use app\domain\Version;
use GuzzleHttp\Client;

class MavenPermalinkAction
{

  public function __invoke(Request $request, $response, $args)
  {
    $groupId = $args['groupId'] ?? '';
    if (empty($groupId)) {
      throw new HttpNotFoundException($request);
    }
    $groupId = str_replace('.', '/', $groupId);

    $artifactId = $args['artifactId'] ?? '';
    if (empty($artifactId)) {
      throw new HttpNotFoundException($request);
    }

    $version = $args['version'] ?? '';
    if (empty($version)) {
      throw new HttpNotFoundException($request);
    }

    $type = $args['type'] ?? 'jar';
    if (empty($type)) {
      throw new HttpNotFoundException($request);
    }

    $artifact = new MavenArtifact($groupId, $artifactId, $type);
    $v = (new MavenVersionResolver($artifact))->resolve($version);
    $realVersion = $artifact->getConcreteVersion($v);
    $url = $artifact->getUrl($v, $realVersion);
    return Redirect::to($response, $url);
  }
}

class MavenArtifact
{
  private string $groupId;
  private string $artifactId;
  private string $type;

  private $versions = null;

  public function __construct(string $groupId, string $artifactId, string $type)
  {
    $this->groupId = $groupId;
    $this->artifactId = $artifactId;
    $this->type = $type;
  }

  public function getGroupId(): string
  {
    return $this->groupId;
  }

  public function getArtifactId(): string
  {
    return $this->artifactId;
  }

  public function getType(): string
  {
    return $this->type;
  }

  public function getUrl(string $version, $realVersion): string
  {
    return $this->getBaseUrl() . "/$version/$this->artifactId-$realVersion.$this->type";
  }

  public function getVersions(): array
  {
    if ($this->versions == null) {
      $this->versions = $this->loadVersions();
    }
    return $this->versions;
  }

  private function getBaseUrl()
  {
    return "https://maven.axonivy.com/$this->groupId/$this->artifactId";
  }

  public function getConcreteVersion($version)
  {
    if (str_contains($version, 'SNAPSHOT')) {
      $baseUrl = $this->getBaseUrl();
      $xml = HttpRequester::request("$baseUrl/$version/maven-metadata.xml");
      if (empty($xml)) {
        return "";
      }
      return self::parseVersionIdentifierFromXml($xml);
    }
    return $version;
  }

  private static function parseVersionIdentifierFromXml(string $xml): string
  {
    $element = new \SimpleXMLElement($xml);
    $result = $element->xpath('/metadata/versioning/snapshotVersions/snapshotVersion');
    return $result[0]->value;
  }

  private function loadVersions(): array
  {
    $baseUrl = $this->getBaseUrl();
    $v = null;
    $xml = HttpRequester::request("$baseUrl/maven-metadata.xml");
    if (!empty($xml)) {
      $v = self::parseVersions($xml);
      usort($v, 'version_compare');
      $v = array_reverse($v);
      $v = array_values($v);
      $v = array_unique($v);
      usort($v, 'version_compare');
      $v = array_reverse($v);
      $v = self::filterSnapshotsWhichAreReleased($v);
    }
    return $v;
  }

  private static function parseVersions($xml)
  {
    $element = new \SimpleXMLElement($xml);
    $result = $element->xpath('/metadata/versioning/versions');
    $versions = get_object_vars($result[0]->version);
    return array_values($versions);
  }

  public static function filterSnapshotsWhichAreReleased(array $versions): array
  {
    return array_values(array_filter($versions, fn ($version) => self::filterReleasedSnapshots($versions, $version)));
  }

  private static function filterReleasedSnapshots(array $versions, string $v): bool
  {
    $ver = new Version($v);
    if ($ver->isSnapshot() || $ver->isSprint()) {
      $releasedVersion = $ver->getBugfixVersion();
      foreach ($versions as $v) {
        $rel = new Version($v);
        if ($rel->isOffical() && $rel->getBugfixVersion() == $releasedVersion) {
          return false;
        }
      }
    }
    return true;
  }
}

class MavenVersionResolver 
{
  private MavenArtifact $artifact;

  public function __construct(MavenArtifact $artifact)
  {
    $this->artifact = $artifact;
  }

  public function resolve(string $requestedVersion): ?string
  {
    // redirect to newest available version
    if ($requestedVersion == 'dev') {
      $v = $this->getNewestVersion();
      if ($v == null) {
        return null;
      }
      return $v;
    }

    // e.g. 10.0-dev
    if (str_ends_with($requestedVersion, '-dev')) {
      $requestedVersion = str_replace('-dev', '', $requestedVersion);
      return self::findNewestDevVersion($requestedVersion);
    }

    // redirect to newest official released
    if ($requestedVersion == 'latest') {
      $v = reset($this->getVersionsReleased());
      if ($v == null) {
        return null;
      }
      return $v;
    }

    $v = new Version($requestedVersion);
    if ($v->isMinor() || $v->isMajor()) {
      $versions = $this->getVersionsReleased();
      foreach ($versions as $ver) {
        if (str_starts_with($ver, $requestedVersion)) {
          return $ver;
        }
      }

      $versions = $this->getVersions();
      foreach ($versions as $ver) {
        if (str_starts_with($ver, $requestedVersion)) {
          return $ver;
        }
      }
    }
    return self::findNewestVersion($requestedVersion);
  }

  private function findNewestVersion(string $version): ?string
  {
    $v = new Version($version);
    if ($v->isMinor() || $v->isMajor()) {
      $versions = $this->getVersionsReleased();
      foreach ($versions as $ver) {
        if (str_starts_with($ver, $version)) {
          return $ver;
        }
      }
      return null;
    }
    return $version;
  }

  private function findNewestDevVersion(string $version): ?string
  {
    $versions = $this->artifact->getVersions();
    foreach ($versions as $ver) {
      if (str_starts_with($ver, $version)) {
        return $ver;
      }
    }
    return null;
  }

  private function getNewestVersion(): ?string
  {
    $versions = $this->artifact->getVersions();
    return reset($versions);
  }

  private function getVersionsReleased(): array
  {
    $versions = $this->artifact->getVersions();
    $versions = array_filter($versions, fn(string $v) => !str_contains($v, '-SNAPSHOT') && !str_contains($v, "-m"));
    return array_values($versions);
  }
}

class HttpRequester
{
  private static $cache = [];

  static function request($url)
  {
    // prevent metadata requests to CDN (maven.axonivy.com) - cache last too long.
    $url = str_replace("https://maven.axonivy.com/", "https://nexus-mirror.axonivy.com/repository/maven/", $url);
    if (!isset(self::$cache[$url])) {
      $client = new Client();
      $options = ['http_errors' => false];
      $res = $client->request('GET', $url, $options);
      $content = '';
      if ('200' == $res->getStatusCode()) {
        $content = $res->getBody();
      }
      self::$cache[$url] = $content;
    }
    return self::$cache[$url];
  }
}
