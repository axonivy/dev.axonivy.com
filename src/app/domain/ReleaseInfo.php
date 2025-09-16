<?php

namespace app\domain;

use app\domain\doc\DocProvider;
use app\Config;
use app\domain\doc\SimpleDocument;

class ReleaseInfo
{

  private Version $version;

  private array $artifacts;

  private string $releaseReadyFile;

  private ?string $releaseDate;

  public function __construct(Version $version, array $artifacts, string $releaseReadyFile)
  {
    $this->version = $version;
    $this->artifacts = $artifacts;
    $this->releaseReadyFile = $releaseReadyFile;
    $this->releaseDate = null;
  }

  public function getVersion(): Version
  {
    return $this->version;
  }

  public function versionNumber(): string
  {
    return $this->version->getVersionNumber();
  }

  public function majorVersion(): string
  {
    return $this->version->getMajorVersion();
  }

  public function minorVersion(): string
  {
    return $this->version->getMinorVersion();
  }

  public function getArtifacts(): array
  {
    return $this->artifacts;
  }

  public function isUnsafeVersion(): bool
  {
    return file_exists($this->getUnsafeVersionPath());
  }
  
  public function getUnsafeReasons(): array
  {
    $unsaveContent = file_get_contents($this->getUnsafeVersionPath());
    $issues = json_decode($unsaveContent, true);
    return (isset($issues) && is_array($issues)) ? $issues : array();
  }

  private function getUnsafeVersionPath(): string
  {
    return $this->getPath() . '/unsafe.version';
  }

  public function getDocProvider(): DocProvider
  {
    return new DocProvider($this->version->getMinorVersion());
  }

  public function hasHotfix(): bool
  {
    return file_exists($this->getHotFixPath());
  }

  public function getHotfixFileUrl(): string
  {
    $fileNames = glob($this->getHotFixPath() . '/*.zip');
    if (empty($fileNames)) {
      return '';
    }
    $fileName = basename($fileNames[0]);

    return '/releases/ivy/' . $this->versionNumber() . '/hotfix/' . $fileName;
  }

  public function getHotfixHowToDocument(): SimpleDocument
  {
    $filename = 'HowTo_Hotfix_AxonIvyEngine.txt';

    $path = $this->createHotFixFilePath($filename);
    if (!file_exists($path)) {
      $filename = 'HowTo_Hotfix_XpertIvyServer.txt';
    }

    $path = $this->createHotFixFilePath($filename);
    $url = '/releases/ivy/' . $this->versionNumber() . '/hotfix/' . $filename;
    return new SimpleDocument('How to install Hotfix', $path, $url);
  }

  private function createHotFixFilePath(string $filename): string
  {
    return Config::releaseDirectory() . '/' . $this->versionNumber() . '/hotfix/' . $filename;
  }

  public function getChecksumsUrl(): string
  {
    return Config::CDN_URL . "/" . $this->versionNumber() . "/checksums.sha256";
  }

  private function getHotFixPath(): string
  {
    return $this->getPath() . '/hotfix';
  }

  public function getPath(): string
  {
    return Config::releaseDirectory() . '/' . $this->versionNumber();
  }

  public function getArtifactByProductNameAndType(string $productName, string $type): ?Artifact
  {
    foreach ($this->artifacts as $artifact) {
      if ($artifact->getProductName() == $productName) {
        if ($artifact->getType() == $type) {
          return $artifact;
        }
      }
    }
    return null;
  }

  public function findArtifactByPermalinkFile(string $permalinkFile): ?Artifact
  {
    foreach ($this->artifacts as $artifact) {
      if (str_ends_with($artifact->getPermalink(), $permalinkFile)) {
        return $artifact;
      }
    }
    return null;
  }

  public function getReleaseDate(): string
  {
    if (is_null($this->releaseDate)) {
      $this->releaseDate = self::readReleaseDate($this->releaseReadyFile);
    }
    return $this->releaseDate;
  }

  private static function readReleaseDate(string $releaseReadyFile)
  {
    $releaseReadyInfos = parse_ini_file($releaseReadyFile);
    return $releaseReadyInfos["releaseDate"] ?? "";
  }
}
