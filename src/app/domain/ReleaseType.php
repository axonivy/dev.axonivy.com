<?php

namespace app\domain;

use app\domain\util\ArrayUtil;

class ReleaseType
{
  private static $typeCache;

  public static function LTS(): ReleaseType
  {
    $type = new ReleaseType();
    $type->key = 'lts';
    $type->archiveKey = $type->key;
    $type->name = 'Long Term Support';
    $type->shortName = 'LTS';
    $type->releaseInfoSupplier = fn (string $key) => ReleaseInfoRepository::getLatestLongTermSupport();
    $type->allReleaseInfoSupplier = fn (string $key) => ReleaseInfoRepository::getLongTermSupportVersions();
    $type->isDevRelease = false;
    $type->headline = '<p>Get the latest stable <a href="/release-cycle" style="text-decoration:underline;font-weight:bold;">Long Term Support</a> version of the Axon Ivy Platform. Or download the <a href="/download/leading-edge">Leading Edge</a> version.';
    $type->bannerSupplier = fn (string $version) => $this->getLtsBanner($version);
    $type->archiveLinkSupplier = fn (ReleaseInfo $releaseInfo) => '/download/archive/' . $releaseInfo->minorVersion();
    $type->promotedDevVersion = false;
    return $type;
  }

  public static function LE(): ReleaseType
  {
    $type = new ReleaseType();
    $type->key = 'leading-edge';
    $type->archiveKey = $type->key;
    $type->name = 'Leading Edge';
    $type->shortName = 'LE';
    $type->releaseInfoSupplier = fn (string $key) => ReleaseInfoRepository::getLeadingEdge();
    $type->isDevRelease = false;
    $type->headline = '<p>Become an early adopter and take the <a href="/release-cycle" style="text-decoration:underline;font-weight:bold;">Leading Edge</a> road with newest features but frequent migrations.</p>';
    $type->bannerSupplier = fn (string $version) => $this->getLeBanner($version);
    $type->archiveLinkSupplier = fn (ReleaseInfo $releaseInfo) => '/download/archive/' . $releaseInfo->majorVersion();
    $type->promotedDevVersion = false;
    return $type;
  }

  public static function SPRINT(): ReleaseType
  {
    $type = self::createDevReleaseType();
    $type->key = 'sprint';
    $type->name = 'Sprint Release';
    $type->shortName = 'Sprint';
    $type->promotedDevVersion = true;
    return $type;
  }

  public static function NIGHTLY(): ReleaseType
  {
    $type = self::createDevReleaseType();
    $type->key = 'nightly';
    $type->name = 'Nightly Build';
    $type->shortName = 'Nightly';
    $type->promotedDevVersion = true;
    return $type;
  }

  public static function DEV(): ReleaseType
  {
    $type = self::createDevReleaseType();
    $type->key = 'dev';
    $type->name = 'Development Build';
    $type->shortName = 'dev';
    $type->promotedDevVersion = false;
    return $type;
  }

  public static function MINOR_NIGHTLY(string $minorVersion, bool $promoted): ReleaseType
  {
    $type = self::createDevReleaseType();
    $type->key = 'nightly-' . $minorVersion;
    $type->name = 'Nightly Build ' . $minorVersion;
    $type->shortName = 'Nightly ' . $minorVersion;
    $type->promotedDevVersion = $promoted;
    return $type;
  }

  private static function createDevReleaseType(): ReleaseType
  {
    $type = new ReleaseType();
    $type->archiveKey = 'unstable';
    $type->releaseInfoSupplier = fn (string $key) => self::devReleaseInfoSupplier($key);
    $type->isDevRelease = true;
    $type->headline = '<p>Our development releases are very unstable and only available for testing purposes.</p>';
    $type->bannerSupplier = fn (string $version) => '<i class="si si-bell" style="background-color:#e62a10;"></i> <b style="color:#e62a10;">These artifacts are for testing purposes only. Never use them on a productive system!</b>';
    $type->archiveLinkSupplier = fn (ReleaseInfo $releaseInfo) => '/download/archive/unstable';
    return $type;
  }

  private function getLtsBanner($version) {
    if ($version == $this->key()) {
      return '';
    }
    foreach (ReleaseInfoRepository::getLongTermSupportVersions() as $ltsVersion) {
      if (str_starts_with($ltsVersion->getVersion()->getBugfixVersion(), $version)) {
        $latest_lts = ReleaseInfoRepository::getLatestLongTermSupport()->getVersion()->getBugfixVersion();
        if (str_starts_with($latest_lts, $version)) {
          return '';
        }
        return '<b>There is a <a href="/download">newer LTS version</a> available for download</b>';
      }
    }
    return '<i class="si si-bell" style="background-color:#e62a10;"></i> <b style="color:#e62a10;">This Long Term Support release is no longer supported! Please update to the latest LTS version.</b>';
  }

  private function getLeBanner($version) {
    $defaultBanner = '<i class="si si-bell"></i> <b>Get familiar with our <a href="/release-cycle">release cycle</a> before you are going to use Leading Edge.</b>';
    if ($version == $this->key()) {
      return $defaultBanner;
    }
    $leVersion = ReleaseInfoRepository::getLeadingEdge();
    if ($leVersion == null || !str_starts_with($leVersion->getVersion()->getBugfixVersion(), $version)) {
      return '<i class="si si-bell" style="background-color:#e62a10;"></i> <b style="color:#e62a10;">This Leading Edge release is no longer supported! Please update to LTS or latest LE version.</b>';
    }
    return $defaultBanner;
  }

  private static function devReleaseInfoSupplier(string $key): ?ReleaseInfo
  {
    return ReleaseInfoRepository::getBestMatchingVersion($key);
  }
  
  public static function VERSION(string $version): ?ReleaseType
  {
    if (!Version::isValidVersionNumber($version)) {
      return null;
    }
    
    if (ReleaseInfoRepository::isOrWasLtsVersion(new Version($version))) {
      $type = ReleaseType::LTS();
    } else {
      $type = ReleaseType::LE();
    }
    $type->releaseInfoSupplier = fn (string $key) => ReleaseInfoRepository::getBestMatchingVersion($version);
    return $type;
  }

  public static function isLTS(ReleaseType $releaseType): bool
  {
    return $releaseType->key == self::LTS()->key;
  }

  private static function types(): array
  {
    if (!empty(self::$typeCache)) {
      return self::$typeCache;
    }

    $nightlyReleases = [];
    foreach (ReleaseInfoRepository::getNightlyMinorReleaseInfos() as $releaseInfo) {
      $v = $releaseInfo->getVersion()->getNightlyMinorVersion();
      
      $promoted = false;
      foreach (ReleaseInfoRepository::getLongTermSupportVersions() as $info) {
        $minorVersion = $info->getVersion()->getMinorVersion();
        if (str_ends_with($v, $minorVersion)) {
          $promoted = true;
        }
      }
      if (!$promoted) {
        $le = ReleaseInfoRepository::getLeadingEdge();
        if ($le != null) {
          $minorVersion = $le->getVersion()->getMinorVersion();
          if (str_ends_with($v, $minorVersion)) {
            $promoted = true;
          } 
        }
      }
      $nightlyReleases[] = self::MINOR_NIGHTLY($v, $promoted);
    }

    self::$typeCache = array_merge(
      [
        self::LTS(),
        self::LE(),
        self::SPRINT(),
        self::NIGHTLY(),
        self::DEV(),
      ],
      $nightlyReleases
    );

    return self::$typeCache;
  }

  public static function PROMOTED_DEV_TYPES(): array
  {
    return array_filter(self::types(), fn (ReleaseType $releaseType) => $releaseType->promotedDevVersion);
  }

  public static function byKey(string $key): ?ReleaseType
  {
    $types = array_filter(self::types(), fn (ReleaseType $type) => $type->key == $key);
    return ArrayUtil::getLastElementOrNull($types);
  }

  public static function byArchiveKey(string $archiveKey): array
  {
    return array_filter(self::types(), fn (ReleaseType $type) => $type->archiveKey == $archiveKey);
  }

  private string $key;

  private string $archiveKey;

  private string $name;

  private string $shortName;

  private $releaseInfoSupplier;

  private $allReleaseInfoSupplier;

  private bool $isDevRelease;

  private string $headline;

  private $bannerSupplier;

  private $archiveLinkSupplier;

  private bool $promotedDevVersion;

  public function releaseInfo(): ?ReleaseInfo
  {
    return $this->releaseInfoSupplier->call($this, $this->key);
  }

  public function allReleaseInfos(): array
  {
    if ($this->allReleaseInfoSupplier != null) {
      return $this->allReleaseInfoSupplier->call($this, $this->key);
    }
    return array_filter([
      $this->releaseInfo()
    ]);
  }

  public function key(): string
  {
    return $this->key;
  }

  public function archiveKey(): string
  {
    return $this->archiveKey;
  }

  public function name(): string
  {
    return $this->name;
  }

  public function shortName(): string
  {
    return $this->shortName;
  }

  public function isDevRelease(): bool
  {
    return $this->isDevRelease;
  }

  public function banner(string $version): string
  {
    return $this->bannerSupplier->call($this, $version);
  }

  public function headline(): string
  {
    return $this->headline;
  }

  public function downloadLink(): string
  {
    return '/download/' . $this->key;
  }

  public function archiveLink(ReleaseInfo $releaseInfo): string
  {
    return $this->archiveLinkSupplier->call($this, $releaseInfo);
  }
}
