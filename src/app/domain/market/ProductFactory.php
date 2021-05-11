<?php

namespace app\domain\market;

use app\domain\maven\MavenArtifact;

class ProductFactory
{

  public static function create(string $key, string $path, string $pathMetaFile): Product
  {
    $content = file_get_contents($pathMetaFile);
    $json = json_decode($content);

    $listed = $json->listed ?? true;
    $sort = $json->sort ?? 999999;
    $info = null;
    if (isset($json->mavenArtifacts)) {
      $info = self::createMavenProductInfo($json);
    }
    $type = $json->type ?? [];
    $tags = $json->tags ?? [];
    $shortDesc = $json->description ?? '';
    $vendor = $json->vendor ?? 'Unknown';
    $costs = $json->costs ?? 'Free';
    $sourceUrl = $json->sourceUrl ?? '';
    $language = $json->language ?? '';
    $industry = $json->industry ?? '';
    $installable = isset($json->installers);
    $minVersion = $json->minVersion ?? '0.0.0';
    return new Product($key, $path, $json->name, $shortDesc, $listed, $sort, $type, $tags, 
      $vendor, $costs, $sourceUrl, $language, $industry, $minVersion, $installable, $info);
  }

  private static function createMavenProductInfo($json): MavenProductInfo
  {
    $mavenArtifacts = self::createMavenArtifacts($json);
    $versionDisplayFilter = VersionDisplayFilterFactory::create($json->versionDisplay ?? '');
    $installMatcher = InstallMatcherFactory::create($json->installMatcher ?? '');
    return new MavenProductInfo($mavenArtifacts, $versionDisplayFilter, $installMatcher);
  }

  private static function createMavenArtifacts($json): array
  {
    $mavenArtifacts = [];
    foreach ($json->mavenArtifacts as $mavenArtifact) {
      $mavenArtifacts[] = MavenArtifact::create($mavenArtifact->key ?? $mavenArtifact->artifactId)
        ->name($mavenArtifact->name)
        ->groupId($mavenArtifact->groupId)
        ->artifactId($mavenArtifact->artifactId)
        ->type($mavenArtifact->type ?? 'iar')
        ->makesSenseAsMavenDependency($mavenArtifact->makesSenseAsMavenDependency ?? false)
        ->doc($mavenArtifact->doc ?? false)
        ->build();
    }
    return $mavenArtifacts;
  }
}
