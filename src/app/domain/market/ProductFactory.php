<?php

namespace app\domain\market;

use app\domain\maven\MavenArtifact;
use app\Config;

class ProductFactory
{
  public static function create(string $key, string $path, string $pathMetaFile): Product
  {
    $content = file_get_contents($pathMetaFile);
    $json = json_decode($content);

    $listed = $json->listed ?? true;
    $info = null;
    if (isset($json->mavenArtifacts)) {
      $info = self::createMavenProductInfo($json);
    }
    $type = $json->type ?? [];
    $tags = $json->tags ?? [];
    $version = $json->version ?? '';
    $shortDesc = $json->description ?? '';
    
    $vendor = $json->vendor ?? 'Axon Ivy AG';
    $vendorImage = $json->vendorImage ?? '/images/misc/axonivy-logo-black.svg';
    $vendorUrl = $json->vendorUrl ?? 'https://www.axonivy.com';

    $platformReview = $json->platformReview ?? '4.0';
    $cost = $json->cost ?? 'Free';
    $sourceUrl = $json->sourceUrl ?? '';
    $statusBadgeUrl = $json->statusBadgeUrl ?? '';
    $language = $json->language ?? '';
    $industry = $json->industry ?? '';
    $compatibility = $json->compatibility ?? '';
    $validate = $json->validate ?? true;
    $contactUs = $json->contactUs ?? false;    
    return new Product($key, $path, $json->name, $version, $shortDesc, $listed, $type, $tags, 
      $vendor, $vendorImage, $vendorUrl, $platformReview, $cost, $sourceUrl, $statusBadgeUrl, $language, $industry, $compatibility, $info, $validate, $contactUs);
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
        ->repoUrl($mavenArtifact->repoUrl ?? Config::MAVEN_ARTIFACTORY_URL)
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
