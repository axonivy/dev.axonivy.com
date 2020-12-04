<?php

namespace app\domain\market;

use app\domain\util\StringUtil;

class VersionDisplayFilterFactory
{
  public static function create($key): VersionDisplayFilter
  {
    if ($key == 'hide-snapshots') {
      return new VersionDisplayFilterHideSnapshots();
    } else if ($key == 'portal') {
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

class VersionDisplayFilterHideSnapshots implements VersionDisplayFilter
{

  public function versionsToDisplay(MavenProductInfo $info): array
  {
    $versions = [];
    foreach ($info->getVersions() as $v) {
      if (!StringUtil::contains($v, '-SNAPSHOT')) {
        $versions[] = $v;
      }
    }
    return $versions;
  }
}

class VersionDisplayFilterHidePortalSprintReleases implements VersionDisplayFilter
{

  public function versionsToDisplay(MavenProductInfo $info): array
  {
    $versionsToDisplay = [];

    $allVersions = $info->getVersions();
    $highesSprintReleases = [];
    foreach ($allVersions as $v) {
      if ($v == '1.0.0.0' || $v == '2.0.0.0') {
        continue;
      }

      if (StringUtil::contains($v, '-m')) { // hide sprint releases (maven milestone releases)
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
    return $versionsToDisplay;
  }
}
