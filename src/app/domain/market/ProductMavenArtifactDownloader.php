<?php
namespace app\domain\market;

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

    $artifact = $info->getProductArtifact();
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
}
