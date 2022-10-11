<?php

namespace app\api;

use app\domain\ReleaseInfo;
use app\domain\ReleaseInfoRepository;
use app\domain\market\Market;

class StatusApi
{
  public function __invoke($request, $response, $args)
  {
    $data = $this->status();
    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }

  private function status()
  {
    return [
      'site' => [
        'phpVersion' => phpversion()
      ],
      'data' => [
        'latestVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLatest()),
        'latestLtsVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLatestLongTermSupport()),
        'leadingEdgeVersion' => $this->getVersionNumber(ReleaseInfoRepository::getLeadingEdge()),
        'longTermSupportVersions' => $this->getVersionNumbers(ReleaseInfoRepository::getLongTermSupportVersions()),
        'versions' => $this->getVersions(),
        'market' => $this->getMarketProducts()
      ]
    ];
  }

  private function getVersionNumbers(array $releaseInfos)
  {
    $versions = [];
    foreach ($releaseInfos as $releaseInfo) {
      $versions[] = $this->getVersionNumber($releaseInfo);
    }
    return $versions;
  }

  private function getVersionNumber(?ReleaseInfo $releaseInfo)
  {
    return $releaseInfo == null ? 'not available' : $releaseInfo->getVersion()->getVersionNumber();
  }

  private function getVersions(): array
  {
    $versions = [];
    foreach (ReleaseInfoRepository::getAvailableReleaseInfos() as $releaseInfo) {
      $versions[] = $releaseInfo->getVersion()->getVersionNumber();
    }
    return $versions;
  }

  private function getMarketProducts(): array
  {
    $products = [];
    foreach (Market::all() as $product) {
      $p = [
        'key' => $product->getKey(),
        'name' => $product->getName(),
        'url' => $product->getUrl()
      ];
      $mavenProductInfo = $product->getMavenProductInfo();
      if ($mavenProductInfo != null) {
        
        $latestVersionToDisplay = 'unavailable';
        $latestVersionAvailable = 'unavailable';
        try {
          $latestVersionToDisplay = $mavenProductInfo->getLatestVersionToDisplay(false, null);
          $latestVersionAvailable = $mavenProductInfo->getLatestVersion();
        } catch (\Exception $ex) { }
        $p['latest-version-to-display'] = $latestVersionToDisplay;
        $p['latest-version-available'] = $latestVersionAvailable;
      }
      $products[] = $p;
    }
    return $products;
  }
}
