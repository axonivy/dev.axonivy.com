<?php

namespace app\domain\market;

class VersionDisplayFilterFactory
{
  public static function create($key): VersionDisplayFilter
  {
    if ($key == 'portal') {
      return new VersionDisplayFilterHidePortalSprintReleases();
    }
    return new VersionDisplayFilterShowAll();
  }
}

class VersionDisplayFilterShowAll implements VersionDisplayFilter
{

  public function versionsToDisplay(MavenProductInfo $info): array
  {
    return $info->getVersions();
  }
}

class VersionDisplayFilterHidePortalSprintReleases implements VersionDisplayFilter
{

  public function versionsToDisplay(MavenProductInfo $info): array
  {
    $versionsToDisplay = [];

    $latestDevRelease = '';
    $allVersions = $info->getVersions();
    $highesSprintReleases = [];
    foreach ($allVersions as $v) {
      if (str_contains($v, '-m')) { // hide sprint releases (maven milestone releases)
        if (empty($latestDevRelease)) {
          $latestDevRelease = $v;
        }
        continue;
      }

      $splittedVersion = explode('.', $v);
      if (count($splittedVersion) == 4) // old one with sprint release number in third 7.1.162.3
      {
        $majorVersion = $splittedVersion[0];
        $minorVersion = $splittedVersion[1];
        $key = $majorVersion . '.' . $minorVersion;
        $value = $splittedVersion[2] . '.' . $splittedVersion[3];
        if (isset($highesSprintReleases[$key])) {
          if (version_compare($value, $highesSprintReleases[$key]) > 0) {
            $highesSprintReleases[$key] = $value;
          }
        } else {
          $highesSprintReleases[$key] = $value;
        }
      } else {
        // new version style 8.0.0
        $versionsToDisplay[] = $v;
      }
    }

    foreach ($highesSprintReleases as $key => $value) {
      $versionsToDisplay[] = $key . '.' . $value;
    }
    
    $versionsToDisplay = self::addDevReleaseIfNoOfficialReleaseIsAvailable($latestDevRelease, $versionsToDisplay);
    
    return self::sortByNewest($versionsToDisplay);
  }
  
  private static function addDevReleaseIfNoOfficialReleaseIsAvailable(string $latestDevRelease, array $versionsToDisplay): array
  {
    $addDevRelease = true;
    if (!empty($latestDevRelease)) {
      foreach ($versionsToDisplay as $v) {
        $splittedVersion = explode('.', $v);
        if (count($splittedVersion) == 4) {
          $v = $splittedVersion[0] . '.' . $splittedVersion[1] . '.' . $splittedVersion[2];
        }
        if (str_starts_with($latestDevRelease, $v)) {
          $addDevRelease = false;
          break;
        }
      }
    }
    if ($addDevRelease) {
      $versionsToDisplay[] = $latestDevRelease;
    }
    return $versionsToDisplay;
  }
  
  private static function sortByNewest(array $versions)
  {
    usort($versions, function (string $v1, string $v2) {
      return version_compare($v2, $v1);
    });
    return $versions;
  }
}
