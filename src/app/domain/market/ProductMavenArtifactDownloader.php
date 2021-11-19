<?php
namespace app\domain\market;

use app\domain\util\StringUtil;
use app\domain\maven\MavenArtifact;
use app\Config;

class ProductMavenArtifactDownloader
{
  public function download(Product $product, string $version)
  {
    $info = $product->getMavenProductInfo();
    if ($info == null) {
      return;
    }

    $artifact = self::findArtifact($info);
    if ($artifact == null) {
      return;
    }

    self::downloadArtifact($product, $artifact, $version);
  }

  public static function downloadArtifact(Product $product, MavenArtifact $artifact, string $version)
  {
    $url = $artifact->getUrl($version);
    $targetDir = Config::marketCacheDirectory() . '/' . $product->getKey() . '/' . $artifact->getArtifactId() . '/' . $version;
    if (!file_exists($targetDir)) {
      $cmd = Config::unzipper() . ' ' . $url . ' ' . $targetDir . ' 2>&1';
      shell_exec($cmd);
    }
  }

  private static function findArtifact(MavenProductInfo $info): ?MavenArtifact
  {
    foreach ($info->getMavenArtifacts() as $mavenArtifact) {
      if (StringUtil::endsWith($mavenArtifact->getArtifactId(), '-product')) {
        return $mavenArtifact;
      }
    }
    return null;
  }
}
