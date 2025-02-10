<?php

namespace app\domain;

use app\Config;

class ArtifactFactory
{
  public static function create(string $folder): array
  {
    $versionNumber = basename($folder);
    $fileNames = glob($folder . '/downloads/*.{zip,deb}', GLOB_BRACE);

    $artifacts = array_map(fn (string $filename) => ArtifactFactory::fromFilename($versionNumber, $filename), $fileNames);

    if (self::isDockerAvailableForVersion($versionNumber)) {
      $artifacts[] = self::createDockerArtifact($versionNumber);
    }
    return $artifacts;
  }

  private static function fromFilename(string $folderName, string $filename): Artifact
  {
    return ArtifactFilenameParser::toArtifact($folderName, $filename);
  }

  private static function createDockerArtifact($versionNumber): Artifact
  {
    return new Artifact(
      Config::DOCKER_IMAGE_ENGINE . ":$versionNumber",
      Artifact::PRODUCT_NAME_ENGINE,
      $versionNumber,
      Artifact::TYPE_DOCKER,
      Artifact::ARCHITECTURE_X64,
      '',
      false,
      '',
      Config::DOCKER_HUB_IMAGE_URL,
      $versionNumber
    );
  }

  private static function isDockerAvailableForVersion(string $versionNumber): bool
  {
    if ($versionNumber == 'nightly-7.0') {
      return false;
    }
    if (version_compare($versionNumber, Config::DOCKER_IMAGE_SINCE_VERSION) >= 0) {
      return true;
    }
    $versionWithoutDots = str_replace('.', '', $versionNumber);
    if (!is_numeric($versionWithoutDots)) { // dev, nighlty, ...
      return true;
    }
    return false;
  }
}

class ArtifactFilenameParser
{
  public static function toArtifact(string $folderName, string $originalFilename): Artifact
  {
    $filename = pathinfo($originalFilename, PATHINFO_FILENAME); // AxonIvyDesigner6.4.0.52683_Windows_x86 or AxonIvyDesigner6.4.0.52683_Osgi_All_x86
    $fileNameArray = explode('_', $filename);
    $architecture = end($fileNameArray); // x86

    $typeParts = array_slice($fileNameArray, 1, -1); // [Windows], [Linux], [All] or [Slim, All]
    $type = implode(' ', $typeParts); // 'Windows', 'Linux', 'All' or 'Slim All'
    $shortType = self::calculateShortType($typeParts); // '-windows', '-linux', '' or '-slim' (-all is removed)

    $productNameVersion = $fileNameArray[0]; // AxonIvyDesigner6.4.0.52683
    $productNameVersionArray = preg_split('/(?=\d)/', $productNameVersion, 2);
    $originaProductNamePrefix = $productNameVersionArray[0];
    $productName = self::calculateProductName($originaProductNamePrefix);
    $versionNumber = $productNameVersionArray[1];

    $mavenPluginComp = $productName == Artifact::PRODUCT_NAME_ENGINE;
    $fileExtension = pathinfo($originalFilename, PATHINFO_EXTENSION);
    $permalinkName = 'axonivy-' . $productName . $shortType . '.' . $fileExtension;
    $permalink = ArtifactLinkFactory::permalink("$folderName/$permalinkName");
    $downloadUrl = ArtifactLinkFactory::cdn("$folderName/" . basename($originalFilename));

    return new Artifact(
      basename($originalFilename),
      $productName,
      $versionNumber,
      $type,
      $architecture,
      $shortType,
      $mavenPluginComp,
      $permalink,
      $downloadUrl,
      $folderName
    );
  }

  private static function calculateShortType(array $typeParts): string
  {
    $shortType = '-' . implode('-', $typeParts);
    $shortType = strtolower($shortType);
    $shortType = str_replace('-all', '', $shortType);
    return $shortType;
  }

  private static function calculateProductName(string $fullName): string
  {
    $fullNameLower = strtolower($fullName);
    if (str_contains($fullNameLower, 'engine')) {
      return Artifact::PRODUCT_NAME_ENGINE;
    }

    if (str_contains($fullNameLower, 'designer')) {
      return Artifact::PRODUCT_NAME_DESIGNER;
    }

    $productName = str_replace('AxonIvy', '', $fullName);
    $productName = str_replace('XpertIvy', '', $productName);
    $productName = str_replace('Server', 'Engine', $productName);
    return $productName;
  }
}

class ArtifactLinkFactory
{
  public static function permalink($path): string
  {
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $basePermalink = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$host";
    return $basePermalink . '/permalink/' . $path;
  }

  public static function cdn($path): string
  {
    return Config::CDN_URL . "/$path";
  }
}
