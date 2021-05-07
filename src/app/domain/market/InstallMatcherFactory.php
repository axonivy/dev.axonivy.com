<?php

namespace app\domain\market;

class InstallMatcherFactory
{
  public static function create($key): InstallMatcher
  {
    return new DefaultInstallMatcher();
  }
}

class DefaultInstallMatcher implements InstallMatcher
{
  public function match(MavenProductInfo $info, string $version): string
  {
    $versions = $info->getVersionsToDisplay();
    foreach ($versions as $v) {
      if (version_compare($v, $version) <= 0) {
        return $v;
      }
    }
    return '';
  }
}
