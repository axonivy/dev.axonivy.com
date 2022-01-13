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
    $versions = [];
    foreach(ReleaseInfoRepository::getAllEverLongTermSupportVersions() as $lts) {
      $versions[] = $lts->majorVersion();
    }
    foreach(ReleaseInfoRepository::getLeadingEdgesSinceLastLongTermVersion() as $le) {
      $versions[] = $le->minorVersion();
    }
    $versions[] = '>';
    return $versions;
  }
  
  private static function getFeatures(): array
  {
    $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'deprecation.json';
    $features = json_decode(file_get_contents($jsonFile));
    foreach ($features as $feature) {
      $cssClassForVersions = array();
      $versions = self::$versions;
      foreach ($versions as $v) {
        $cssClassForVersions[$v] = self::cssClassForVersion($feature, $versions, $v);
      }
      $feature->cssClassForVersions = $cssClassForVersions;
    }
    return $features;
  }

  private static function cssClassForVersion($feature, array $versions, String $version) 
  {
    $cls = "";
    foreach ($versions as &$v) {
      if ($v == $feature->released) {
        $cls = "deprecation-released";
      }
      if ($v == $feature->deprecated) {
        $cls = "deprecation-deprecated";
      }
      $removed = $feature->removed ?? '';
      if ($v == $removed) {
        $cls = "deprecation-removed";
      }
      if ($v == $version) {
        return $cls;
      }
      if ($cls == "deprecation-removed") {
        $cls = "";  
      }
      if ($cls == "deprecation-released") {
        $cls = "deprecation-ok";
      }
    }
    return $cls;
  }
}

