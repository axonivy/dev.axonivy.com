<?php

namespace app\api;

use Slim\Psr7\Request;
use app\domain\ReleaseInfo;
use app\domain\ReleaseType;
use app\domain\ReleaseInfoRepository;
use app\domain\Version;
use app\domain\doc\DocProvider;
use app\domain\util\ArrayUtil;

class Docs
{
  public function __invoke(Request $request, $response, $args)
  {
    $product = $args["product"];
    $version = $args["version"];
    $language = $args["language"];
    $versionInfo = $this->findVersionInfo($version);
    $docProvider = $this->findDocProvider($versionInfo, $version);

    $data = [
      'versions' => $this->getVersions($request, $versionInfo, $docProvider, $version, $language),
      'languages' => $this->getLanguages($request, $docProvider, $language)
    ];
    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }

  private function findVersionInfo(string $version) {
    $versionInfo = ReleaseInfoRepository::getBestMatchingVersion($version);
    if ($versionInfo != null && $versionInfo->minorVersion() == "dev") {
      return null;
    }
    return $versionInfo;
  }

  private function findDocProvider(?ReleaseInfo $versionInfo, string $version) {
    if ($versionInfo == null) {
      $newestDoc = DocProvider::getNewestDocProvider();
      if ($newestDoc->getMinorVersion() == $version || $version == "dev") {
        return $newestDoc;
      }
      return null;
    }
    return $versionInfo->getDocProvider();
  }

  private function getVersions(Request $request, ?ReleaseInfo $versionInfo, ?DocProvider $docProvider, string $version, string $language): array
  {
    $versions = [];
    $leadingEdgeVersions = ReleaseType::LE()->allReleaseInfos();
    $ltsVersions = ReleaseType::LTS()->allReleaseInfos();
    foreach ($ltsVersions as $releaseInfo) {
      $versions[] = $this->createVersion($request, $releaseInfo->getDocProvider(), $releaseInfo->minorVersion(), $language);
    }
    foreach ($leadingEdgeVersions as $releaseInfo) {
      $versions[] = $this->createVersion($request, $releaseInfo->getDocProvider(), $releaseInfo->minorVersion(), $language);
    }
    if ($versionInfo == null) {
      $versions[] = $this->createVersion($request, $docProvider, $version, $language);
    } else if (!in_array($versionInfo, $leadingEdgeVersions) && !in_array($versionInfo, $ltsVersions)) {
      $versions[] = $this->createVersion($request, $versionInfo->getDocProvider(), $releaseInfo->minorVersion(), $language);
    }
    return $versions;
  }

  private function createVersion(Request $request, ?DocProvider $docProvider, string $version, string $language) 
  {
    if ($docProvider == null) {
      return ["version" =>  $version, "url" => "#"];
    }
    $path = $docProvider->getLanguageMinorUrl($language);
    if (!in_array($language, $docProvider->getLanguages())) 
    {
      $path = $docProvider->getDefaultLanguageMinorUrl();
    }
    $url = $request->getUri()->withPath($path);
    return ["version" =>  $version, "url" => (string)$url];
  }

  private function getLanguages(Request $request, ?DocProvider $docProvider, string $language): array
  {
    $languages = [];
    if ($docProvider == null) {
      $languages[] = $this->createLanguage($language, "#");
      return $languages;
    }
    if (!$docProvider->exists()) {
      $languages[] = $this->createLanguage($language, "#");
      return $languages;
    }
    $langs = $docProvider->getLanguages();
    if (!in_array($language, $langs)) {
      $langs[] = $language;
    }
    foreach($langs as $lang) {
      $url = $request->getUri()->withPath($docProvider->getMinorUrl() . "/" . $lang);
      $languages[] = $this->createLanguage($lang, (string)$url);
    }
    return $languages;
  }

  private function createLanguage(string $lang, string $url) : array 
  {
    return ["language" => $lang, "url" => $url];    
  }
}
