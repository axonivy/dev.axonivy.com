<?php

namespace app\domain\market;

use app\domain\maven\MavenArtifact;
use app\domain\Version;

class MavenProductInfo
{
  private array $mavenArtifacts;
  private VersionDisplayFilter $versionDisplayFilter;
  private InstallMatcher $installMatcher;

  public function __construct(array $mavenArtifacts, VersionDisplayFilter $versionDisplayFilter, InstallMatcher $installMatcher)
  {
    $this->mavenArtifacts = $mavenArtifacts;
    $this->versionDisplayFilter = $versionDisplayFilter;
    $this->installMatcher = $installMatcher;
  }

  public function getMavenArtifacts(): array
  {
    return $this->mavenArtifacts;
  }

  public function getMavenArtifactsForVersion($version): array
  {
    $artifacts = [];
    foreach ($this->mavenArtifacts as $mavenArtifact) {
      foreach ($mavenArtifact->getVersions() as $v) {
        if ($version == $v) {
          $artifacts[] = $mavenArtifact;
        }
      }
    }
    return $artifacts;
  }
  
  public function getFirstDocArtifact(): ?MavenArtifact
  {
    foreach ($this->mavenArtifacts as $mavenArtifact) {
      if ($mavenArtifact->isDocumentation()) {
        return $mavenArtifact;
      }
    }
    return null;
  }
  
  public function getProductArtifact(): ?MavenArtifact
  {
    foreach ($this->getMavenArtifacts() as $mavenArtifact) {
      if ($mavenArtifact->isProductArtifact()) {
        return $mavenArtifact;
      }
    }
    return null;
  }

  public function getVersions(): array
  {
    $versions = [];
    foreach ($this->mavenArtifacts as $mavenArtifact) {
      $versions = array_merge($mavenArtifact->getVersions(), $versions);
    }
    $versions = MavenArtifact::filterSnapshotsWhichAreRealesed($versions);
    $versions = array_unique($versions);
    usort($versions, 'version_compare');
    $versions = array_reverse($versions);
    return $versions;
  }

  public function getVersionsToDisplay(bool $showDevVersions, ?String $requestVersion): array
  {
    $versions = $this->versionDisplayFilter->versionsToDisplay($this);
    if (!$showDevVersions) {
      if (empty($requestVersion)) {
        $versions = array_filter($versions, fn(string $v) => !str_contains($v, '-SNAPSHOT'));
      } else {
        if (Version::isValidVersionNumber($requestVersion)) {
          $requestVersion = (new Version($requestVersion))->getMinorVersion();
        }
        $versions = array_filter($versions, fn(string $v) => str_starts_with($v, $requestVersion) || !str_contains($v, '-SNAPSHOT'));  
      }

      $versions = array_values($versions);
    }
    return $versions;
  }

  public function getLatestVersion(): ?string
  {
    $versions = $this->getVersions();
    if (empty($versions)) {
      return null;
    }
    return $versions[0];
  }

  public function getOldestVersion(): ?string
  {
    $versions = $this->getVersions();
    if (empty($versions)) {
      return null;
    }
    return $versions[count($versions) - 1];
  }

  public function getLatestVersionToDisplay(bool $showDevVersion, ?String $requestedVersion): ?string
  {
    $versions = $this->getVersionsToDisplay($showDevVersion, $requestedVersion);
    if (empty($versions)) {
      return null;
    }
    return $versions[0];
  }

  public function hasVersion(string $v): bool
  {
    $versions = $this->getVersions();
    foreach ($versions as $version) {
      if ($version == $v) {
        return true;
      }
    }
    return false;
  }

  public function findBestMatchingVersion(string $v): ?string
  {
    return $this->installMatcher->match($this, $v);    
  }
}
