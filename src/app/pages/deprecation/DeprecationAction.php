<?php

namespace app\pages\deprecation;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\Version;
use app\domain\util\Redirect;
use app\domain\Artifact;

class DeprecationAction
{
  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke(Request $request, $response, $args)
  {
    return $this->view->render($response, 'deprecation/deprecation.twig', [
      'versions' => self::getVersions(),
      'features' => self::getFeatures()
    ]);
  }
  
  private static function getVersions(): array
  {
    return ["3", "4", "5", "6", "7", "8", "9.1", "9.2", "9.3"];
  }
  
  private static function getFeatures(): array
  {
    $jsonFile = __DIR__ . DIRECTORY_SEPARATOR . 'deprecation.json';
    $features = json_decode(file_get_contents($jsonFile));
    foreach ($features as &$feature) {
      $cssClassForVersions = array();
      $versions = DeprecationAction::getVersions();
      foreach ($versions as &$v) {
        $cssClassForVersions[$v] = DeprecationAction::cssClassForVersion($feature, $versions, $v);
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
      if ($v == $feature->removed) {
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

