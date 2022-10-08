<?php

namespace app\domain\market;

use app\domain\Version;

class InstallMatcherFactory
{
  public static function create($key): InstallMatcher
  {
    if ($key == 'best-match') {
      return new BestMatchFirstInstallMatcher();
    }
    return new LtsTrainInstallMatcher();
  }
}

/**
 * Will first install the best match.
 * Comming with Axon Ivy 9.2.2 will first try to install 9.2.2.
 * 
 * - portal
 */
class BestMatchFirstInstallMatcher implements InstallMatcher
{
  public function match(MavenProductInfo $info, string $version): string
  {
    $versions = $info->getVersionsToDisplay(true, null);
    foreach ($versions as $v) {
      $bugfixVersion = (new Version($v))->getBugfixVersion();
      if (version_compare($bugfixVersion, $version) <= 0) {
        return $v;
      }
    }
    return '';
  }
}

/**
 * Will try to always install the latest version on the current LTS train
 * Comming with Axon Ivy 9.2.0 will try to install the latest 9.2.x
 * 
 * - doc factory
 */
class LtsTrainInstallMatcher implements InstallMatcher
{
  public function match(MavenProductInfo $info, string $version): string
  {
    $minorVersion = (new Version($version))->getMinorVersion();
    $versions = $info->getVersionsToDisplay(true, null);
    foreach ($versions as $v) {
      $minorV = (new Version($v))->getMinorVersion();      
      if (version_compare($minorV, $minorVersion) <= 0) {
        return $v;
      }
    }
    return (new BestMatchFirstInstallMatcher())->match($info, $version);
  }
}
