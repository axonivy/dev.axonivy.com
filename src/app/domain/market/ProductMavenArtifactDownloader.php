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

    $url = $artifact->getUrl($version);
    $targetDir = Config::marketCacheDirectory() . '/' . $product->getKey() . '/' . $version;
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
