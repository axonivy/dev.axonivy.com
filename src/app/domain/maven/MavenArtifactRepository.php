<?php

namespace app\domain\maven;

use app\domain\market\Market;

class MavenArtifactRepository
{
  public static function getMavenArtifact($key, $type): ?MavenArtifact
  {
    $artifacts = self::getAll();
    foreach ($artifacts as $artifact) {
      if ($artifact->getKey() == $key && $artifact->getType() == $type) {
        return $artifact;
      }
    }
    return null;
  }

  public static function getByKey(string $key): ?MavenArtifact
  {
    foreach (self::getAll() as $artifact) {
      if ($artifact->getKey() == $key) {
        return $artifact;
      }
    }
    return null;
  }

  private static function getAll(): array
  {
    $all = [self::getProcessingValve()];
    foreach (Market::all() as $product) {
      $info = $product->getMavenProductInfo();
      if ($info != null) {
        $all = array_merge($all, $info->getMavenArtifacts());
      }
    }
    return $all;
  }

  private static function getProcessingValve(): MavenArtifact
  {
    return MavenArtifact::create('processing-valve')
      ->name('Processing Valve Demo')
      ->groupId('com.axonivy.demo.extensions')
      ->artifactId('processing-valve')
      ->type('jar')
      ->build();
  }
}
