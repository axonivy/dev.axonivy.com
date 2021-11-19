<?php

namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Request;
use app\domain\market\Market;
use app\domain\util\Redirect;
use app\domain\util\StringUtil;
use app\domain\ReleaseType;
use app\domain\market\Product;
use app\domain\market\MavenProductInfo;
use app\domain\market\ProductMavenArtifactDownloader;

class PortalPermalinkAction
{

  public function __invoke(Request $request, $response, $args)
  {
    $version = $args['version'] ?? '';

    if (empty($version)) {
      return Redirect::to($response, '/market/portal');
    }

    $product = Market::getProductByKey('portal');
    $portal = $product->getMavenProductInfo();
    $version = self::evaluatePortalVersion($version, $portal);

    $topic = $args['topic'] ?? '';
    if (empty($topic)) {
      return Redirect::to($response, '/market/portal/' . $version);
    }

    if ($topic == 'doc') {
      $path = $args['path'] ?? '';
      if (!empty($path)) {
        $path = '/' . $path;
      }

      $docArtifact = $portal->getFirstDocArtifact();
      if ($docArtifact == null) {
        throw new HttpNotFoundException($request);
      }
      $exists = (new ProductMavenArtifactDownloader())->downloadArtifact($product, $docArtifact, $version);
      if (!$exists) {
        throw new HttpNotFoundException($request);
      }
      $docUrl = $docArtifact->getDocUrl($product, $version);
      return Redirect::to($response, $docUrl . $path);
    }
    throw new HttpNotFoundException($request);
  }

  private static function evaluatePortalVersion(String $version, MavenProductInfo $portal): String
  {
    $releaseType = ReleaseType::byKey($version);
    if ($releaseType != null && $releaseType->isDevRelease()) {
      return $portal->getLatestVersion();
    }

    if ($version == 'latest') {
      return $portal->getLatestVersionToDisplay();
    }

    if (self::isMinorVersion($version)) {
      $portalVersions = $portal->getVersionsToDisplay();
      foreach ($portalVersions as $v) {
        if (StringUtil::startsWith($v, $version)) {
          return $v;
        }
      }
    }
    return $version;
  }

  private static function isMinorVersion($version)
  {
    $count = substr_count($version, '.');
    return $count == 1;
  }
}
