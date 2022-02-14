<?php

namespace app\domain;

use app\domain\util\ArrayUtil;
use app\domain\util\StringUtil;
use app\Config;
use phpDocumentor\Reflection\Types\Boolean;

class ReleaseInfoRepository
{

  /**
   * release with highest version
   */
  public static function getLatest(): ?ReleaseInfo
  {
    $releaseInfos = self::getAvailableReleaseInfos();
    return ArrayUtil::getLastElementOrNull($releaseInfos);
  }

  /**
   * current leading edge
   */
  public static function getLeadingEdge(): ?ReleaseInfo
  {
    $releaseInfo = self::getLatest();
    if ($releaseInfo == null) {
      return null;
    }
    if ($releaseInfo->getVersion()->getMajorVersion() % 2 == 1) {
      return $releaseInfo;
    }
    return null;
  }

  public static function getLeadingEdgesSinceLastLongTermVersion(): array
  {
    $le = self::getLeadingEdge();
    if ($le == null) {
      return [];
    }
    $leadingEdges = [];
    for ($minor = 1; $minor <= $le->getVersion()->getMinorNumber(); $minor++) {
      $leadingEdges[] = self::getBestMatchingVersion($le->majorVersion() . '.' . $minor);
    }
    return $leadingEdges;
  }

  /**
   * lts with highest version
   */
  public static function getLatestLongTermSupport(): ?ReleaseInfo
  {
    $releaseInfos = self::getLongTermSupportVersions();
    return ArrayUtil::getLastElementOrNull($releaseInfos);
  }

  /**
   * lts releases
   */
  public static function getLongTermSupportVersions(): array
  {
    $ltsMajorVersions = self::getAllEverLongTermSupportVersions();
    $lts = array_slice($ltsMajorVersions, -Config::NUMBER_LTS, Config::NUMBER_LTS);
    return $lts;
  }

  /**
   * All lts releases ever (not only the current ones) 
   */
  public static function getAllEverLongTermSupportVersions(): array
  {
    $releaseInfos = self::getAvailableReleaseInfos();

    $majorVersions = array_map(fn (ReleaseInfo $releaseInfo) => $releaseInfo->getVersion()->getMajorVersion(), $releaseInfos);
    $uniqueMajorVersions = array_unique($majorVersions);

    $ltsMajorVersions = [];
    foreach ($uniqueMajorVersions as $majorVersion) {
      if (self::isOrWasLts($majorVersion)) {
        $ltsMajorVersions[] = $majorVersion;
      }
    }
    return array_filter(array_map(fn (string $ltsMajorVersion) => self::findNewestLTSVersion($ltsMajorVersion), $ltsMajorVersions));
  }

  /**
   * version: 7.0.1, 7.0, 7
   */
  private static function findNewestLTSVersion($version): ?ReleaseInfo
  {
    if ($version == 7) { // remove this when LTS 10.0 has been released
      $version = '7.0';
    }

    $releaseInfos = array_reverse(self::getAvailableReleaseInfos());
    foreach ($releaseInfos as $releaseInfo) {
      if ($releaseInfo->getVersion()->isMinor()) {
        continue;
      }
      if (StringUtil::startsWith($releaseInfo->getVersion()->getVersionNumber(), $version)) {
        return $releaseInfo;
      }
    }
    return null;
  }

  public static function getAvailableReleaseInfos(): array
  {
    $releaseInfos = [];
    $directories = array_filter(glob(Config::releaseDirectory() . '/*'), 'is_dir');
    foreach ($directories as $directory) {
      $releaseReadyFile = $directory . '/release.ready';
      if (!file_exists($releaseReadyFile)) {
        continue;
      }

      $versionNumber = basename($directory);
      $artifacts = ArtifactFactory::create($directory);
      $releaseInfos[] = new ReleaseInfo(new Version($versionNumber), $artifacts, $releaseReadyFile);
    }
    $releaseInfos = self::sortReleaseInfosByVersionOldestFirst($releaseInfos);
    return $releaseInfos;
  }

  /**
   * 8.0
   * 8.0.3
   */
  public static function isReleased($version): bool
  {
    return self::getBestMatchingVersion($version) != null;
  }

  /**
   * e.g: 7.0.3, 8.0.1, sprint, nightly, dev
   * - 8.0 -> newest 8.0.x
   * - 8 -> newest 8.x
   */
  public static function getBestMatchingVersion(string $version): ?ReleaseInfo
  {
    $releaseInfos = self::getMatchingVersions($version);

    // prefer perfect match for alphanumeric versions (e.g. nightly instead nightly-8 for nightly)
    if (!is_numeric($version)) {
      foreach ($releaseInfos as $releaseInfo) {
        if ($releaseInfo->getVersion()->getVersionNumber() == $version) {
          return $releaseInfo;
        }
      }
    }

    $releaseInfos = array_reverse($releaseInfos);
    return ArrayUtil::getLastElementOrNull($releaseInfos);
  }

  public static function getMatchingVersions(string $version): array
  {
    $releaseInfos = self::sortReleaseInfosByVersionNewestFirst(self::getAvailableReleaseInfos());
    $infos = [];
    foreach ($releaseInfos as $info) {
      $versionNumber = $info->getVersion()->getVersionNumber();
      if (StringUtil::startsWith($versionNumber, $version)) {
        $infos[] = $info;
      }
    }
    return $infos;
  }

  private static function sortReleaseInfosByVersionOldestFirst(array $releaseInfos)
  {
    usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
      return version_compare($r1->getVersion()->getVersionNumber(), $r2->getVersion()->getVersionNumber());
    });
    return $releaseInfos;
  }

  private static function sortReleaseInfosByVersionNewestFirst(array $releaseInfos)
  {
    usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
      return version_compare($r2->getVersion()->getVersionNumber(), $r1->getVersion()->getVersionNumber());
    });
    return $releaseInfos;
  }

  public static function isOrWasLtsVersion(Version $version): bool 
  {
    return ReleaseInfoRepository::isOrWasLts($version->getMajorVersion());
  }
  
  private static function isOrWasLts(string $majorVersion): bool
  {
    $major = intval($majorVersion);
    if ($major == 0) { // nightly-8, etc.
      return false;
    }
    if ($major % 2 == 0) {
      return true;
    }
    if ($major <= 7) { // before 8 also uneven numbers where LTS
      return true;  
    }
    return false;
  }
}
