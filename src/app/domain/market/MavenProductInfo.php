<?php

namespace app\domain\market;

use app\domain\maven\MavenArtifact;

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

  public function getVersionsToDisplay(): array
  {
    return $this->versionDisplayFilter->versionsToDisplay($this);
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

  public function getLatestVersionToDisplay(): ?string
  {
    $versions = $this->getVersionsToDisplay();
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
