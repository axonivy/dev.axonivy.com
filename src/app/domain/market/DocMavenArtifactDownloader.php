<?php
namespace app\domain\market;

use app\domain\maven\MavenArtifact;
use app\Config;

class DocMavenArtifactDownloader
{
  public function download(MavenArtifact $docArtifact, string $version)
  {
    $targetDir = Config::docCacheDirectory() . '/' . $docArtifact->getDocSubFolder($version);
    if (!file_exists($targetDir)) {
      $cmd = Config::unzipper() . ' ' . $docArtifact->getUrl($version) . ' ' . $targetDir. ' 2>&1';
      shell_exec($cmd);
    }
  }
}
