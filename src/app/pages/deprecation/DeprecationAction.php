<?php

namespace app\pages\deprecation;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\Version;
use app\domain\util\Redirect;
use app\domain\Artifact;
use app\domain\ReleaseInfoRepository;

class DeprecationAction
{
  private static array $versions;

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke(Request $request, $response, $args)
  {
    self::$versions = self::getVersions();
    return $this->view->render($response, 'deprecation/deprecation.twig', [
      'versions' => self::$versions,
      'features' => self::getFeatures()
    ]);
  }
  
  private static function getVersions(): array
  {
    return ["3", "4", "5", "6", "7", "8", "10", "11"];
  }
  
  private static function getFeatures(): array
  {
    $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'deprecation.json';
    $features = json_decode(file_get_contents($jsonFile));
    foreach ($features as $feature) {
      $cssClassForVersions = array();
      $versions = self::$versions;
      foreach ($versions as $version) {
        $cssClassForVersions[$version] = self::cssClassForVersion($feature, $version);
      }
      $feature->cssClassForVersions = $cssClassForVersions;
    }
    return $features;
  }

  private static function cssClassForVersion($feature, String $version) 
  {
    if (self::isPreRelease($feature, $version)) {
      return "";
    }
    if (self::isReleased($feature, $version)) {
      return "deprecation-released";
    }
    if (self::isAvailable($feature, $version)) {
      return "deprecation-ok";
    }
    if (self::isRemoved($feature, $version)) {
      return "deprecation-removed";
    }
    if (self::isDeprecated($feature, $version)) {
      return "deprecation-deprecated";
    }
  }

  private static function isPreRelease($feature, $version): bool {
    return version_compare($version, $feature->released) == -1;
  }

  private static function isReleased($feature, $version): bool {
    return version_compare($version, $feature->released) == 0;
  }

  private static function isAvailable($feature, $version): bool {
    return version_compare($version, $feature->deprecated) == -1;
  }

  private static function isDeprecated($feature, $version): bool {
    return version_compare($version, $feature->deprecated) == 0 || !isset($feature->removed) || version_compare($version, $feature->removed) == -1;
  }

  private static function isRemoved($feature, $version): bool {
    if (!isset($feature->removed)) {
      return false;
    }
    return version_compare($version, $feature->removed) == 0;
  }
}

