<?php

namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use Slim\Views\Twig;
use app\domain\market\Market;
use app\domain\market\Product;
use Slim\Psr7\Request;
use app\domain\market\MavenProductInfo;

class ProductAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {
    $key = $args['key'] ?? '';
    $product = Market::getProductByKey($key);
    if ($product == null) {
      throw new HttpNotFoundException($request);
    }

    $mavenProductInfo = $product->getMavenProductInfo();
    $version = $args['version'] ?? '';
    $mavenArtifactsAsDependency = [];
    $mavenArtifacts = [];
    $docArtifacts = [];

    if ($mavenProductInfo == null && !empty($version)) {
      throw new HttpNotFoundException($request);
    }

    if ($mavenProductInfo != null) {
      if (empty($version)) {
        $version = self::findBestMatchingVersionFromCookie($request, $mavenProductInfo);
        if (empty($version)) {
          $version = $mavenProductInfo->getLatestVersionToDisplay();
        }
      } else if (!$mavenProductInfo->hasVersion($version)) {
        throw new HttpNotFoundException($request);
      }

      $mavenArtifacts = $mavenProductInfo->getMavenArtifactsForVersion($version);
      foreach ($mavenArtifacts as $artifact) {
        if ($artifact->getMakesSenseAsMavenDependency()) {
          $mavenArtifactsAsDependency[] = $artifact;
        }
      }

      foreach ($mavenArtifacts as $artifact) {
        if ($artifact->isDocumentation() && $artifact->docExists($version)) {
          $docArtifacts[] = $artifact;
        }
      }
    }

    $installButton = self::createInstallButton($request, $product, $version);
    
    $getInTouchLink = 'https://www.axonivy.com/marketplace/contact/?market_solutions=' . $product->getKey();

    return $this->view->render($response, 'market/product.twig', [
      'product' => $product,
      'mavenProductInfo' => $mavenProductInfo,
      'mavenArtifacts' => $mavenArtifacts,
      'mavenArtifactsAsDependency' => $mavenArtifactsAsDependency,
      'docArtifacts' => $docArtifacts,
      'selectedVersion' => $version,
      'installButton' => $installButton,
      'getInTouchLink' => $getInTouchLink
    ]);
  }

  private static function createInstallButton(Request $request, Product $product, string $currentVersion): InstallButton
  {
    $version = self::readIvyVersionCookie($request);
    $isDesigner = !empty($version);
    $reason = $product->getReasonWhyNotInstallable($version);
    $isShow = $product->isInstallable();
    return new InstallButton($isDesigner, $reason, $product, $isShow, $request, $currentVersion);
  }

  private static function readIvyVersionCookie(Request $request)
  {
    $cookies = $request->getCookieParams();
    return $cookies['ivy-version'] ?? '';
  }
  
  private static function findBestMatchingVersionFromCookie(Request $request, MavenProductInfo $mavenProductInfo)
  {
    $version = self::readIvyVersionCookie($request);
    if (empty($version)) {
      return '';
    }
    return $mavenProductInfo->findBestMatchingVersion($version);
  }
}

class InstallButton
{
  public bool $isDesigner;
  public string $reason;
  public bool $isShow;
  private Product $product;
  private Request $request;
  private string $currentVersion;
  
  function __construct(bool $isDesigner, string $reason, Product $product, bool $isShow, Request $request, string $currentVersion)
  {
    $this->isDesigner = $isDesigner;
    $this->reason = $reason;
    $this->product = $product;
    $this->isShow = $isShow;
    $this->request = $request;
    $this->currentVersion = $currentVersion;
  }

  public function isEnabled(): bool
  {
    return empty($this->reason);
  }

  public function getJavascriptCallback(): string
  {
    return "install('" . $this->metaUrl . "')";
  }
  
  public function getMultipleVersions(): bool
  {
    return $this->product->getMavenProductInfo() != null;
  }
  
  public function getMetaUrl($version): string
  {
    return $this->metaJsonUrl($this->currentVersion);
  }
  
  public function getMetaJsonUrl($version): string
  {
    return $this->metaJsonUrl($version);
  }
  
  private function metaJsonUrl($version): string
  {
    $uri = $this->request->getUri();
    $baseUrl = $uri->getScheme() . '://' . $uri->getHost();
    return $baseUrl . $this->product->getMetaUrl($version);
  }
}
