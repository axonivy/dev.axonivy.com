<?php

namespace app\api;

use Slim\Psr7\Request;
use app\domain\ReleaseInfo;
use app\domain\ReleaseType;
use app\domain\ReleaseInfoRepository;
use app\domain\Version;
use app\domain\util\ArrayUtil;

class Docs
{
  public function __invoke(Request $request, $response, $args)
  {
    $product = $args["product"];
    $version = $args["version"];
    $language = $args["language"];

    $data = [
      'versions' => $this->getVersions($request, $product, $version, $language),
      'languages' => $this->getLanguages($request, $product, $version, $language)
    ];
    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }

  private function getVersions(Request $request, string $product, string $version, string $language): array
  {
    $versions = [];
    $versionInfo = ReleaseInfoRepository::getBestMatchingVersion($version);
    $leadingEdgeVersions = ReleaseType::LE()->allReleaseInfos();
    $ltsVersions = ReleaseType::LTS()->allReleaseInfos();
    foreach ($ltsVersions as $releaseInfo) {
      $versions[] = $this->createVersion($request, $releaseInfo, $language);
    }
    foreach ($leadingEdgeVersions as $releaseInfo) {
      $versions[] = $this->createVersion($request, $releaseInfo, $language);
    }
    if ($versionInfo == null) {
      $versions[] = ["version" =>  $version, "url" => "#"];
    } else if (!in_array($versionInfo, $leadingEdgeVersions) && !in_array($versionInfo, $ltsVersions)) {
      $versions[] = $this->createVersion($request, $versionInfo, $language);
    }
    return $versions;
  }

  private function createVersion(Request $request, ReleaseInfo $releaseInfo, string $language) 
  {
    $docProvider = $releaseInfo->getDocProvider();
    $path = $docProvider->getLanguageMinorUrl($language);
    if (!in_array($language, $docProvider->getLanguages())) 
    {
      $path = $docProvider->getDefaultLanguageMinorUrl();
    }
    $url = $request->getUri()->withPath($path);
    $versionNr = $docProvider->getMinorVersion();
    return ["version" =>  $versionNr, "url" => (string)$url];
  }

  private function getLanguages(Request $request, string $product, string $version, string $language): array
  {
    $languages = [];
    $versionInfo = ReleaseInfoRepository::getBestMatchingVersion($version);
    if ($versionInfo == null) 
    {
      $languages[] = $this->createLanguage($language, "#");
      return $languages;    
    }
    $docProvider = $versionInfo->getDocProvider();
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
