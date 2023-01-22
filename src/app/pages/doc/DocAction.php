<?php

namespace app\pages\doc;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\ReleaseInfoRepository;
use app\domain\doc\DocProvider;
use app\domain\util\Redirect;
use app\domain\ReleaseType;
use app\domain\Version;
use DI\NotFoundException;

class DocAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, Response $response, $args)
  {
    $version = $args['version'];

    $doc = $args['document'] ?? '';
    if (!empty($doc)) {
      $doc = '/' . $doc;
    }

    // special treatment when using a major version e.g. 8/9/10
    if (!str_contains($version, '.') && is_numeric($version)) {
      $releaseInfo = ReleaseInfoRepository::getBestMatchingVersion($version);
      if ($releaseInfo == null) {
        throw new NotFoundException();
      }      
      return Redirect::to($response, $releaseInfo->getDocProvider()->getMinorUrl() . $doc);
    }

    // special treatement for dev, sprint, nightly
    if ($version == "dev" || $version == "sprint" || $version == "nightly") {
      $url = DocProvider::getNewestDocProvider()->getMinorUrl();      
      return Redirect::to($response, $url . $doc);
    }

    // nightly-8.0
    if (str_starts_with($version, "nightly-")) {
      $v = str_replace("nightly-", "", $version);
      $v = new Version($v);
      $v = $v->getMinorVersion();
      $docProvider = new DocProvider($v);
      if (!$docProvider->exists()) {
        throw new HttpNotFoundException($request);      
      }
      return Redirect::to($response, $docProvider->getMinorUrl() . $doc);
    }

    // special treatement for latest
    if ($version == "latest") {
      $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();
      if ($releaseInfo == null) {
        throw new NotFoundException();
      }
      return Redirect::to($response, $releaseInfo->getDocProvider()->getMinorUrl() . $doc);
    }

    $v = new Version($version);
    $version = $v->getMinorVersion();
    $docProvider = new DocProvider($version);
    if (!$docProvider->exists()) {
      throw new HttpNotFoundException($request);      
    }

    // redirect to minor version if access is not via minor version
    if ($args['version'] != $version) {
      return Redirect::to($response, $docProvider->getMinorUrl() . $doc);
    }

    if ($this->documentationBasedOnReadTheDocs($version)) {
      $newDocUrl = $this->resolveNewDocUrl($docProvider->getOverviewUrl(), $args['document'] ?? '', new Version($version));
      if (empty($newDocUrl)) {
        throw new HttpNotFoundException($request);
      } else {
        return Redirect::to($response, $newDocUrl);
      }
    }

    // legacy, before 9
    $doc = null;
    $document = '';
    if (isset($args['document'])) {
      $document = $args['document'];
      if ($document == 'ReleaseNotes.html') {
        return Redirect::to($response, 'release-notes');
      }
      $doc = $docProvider->findDocumentByNiceUrlPath($document);
    } else {
      $doc = $docProvider->getOverviewDocument();
    }

    if ($doc == null) {
      throw new HttpNotFoundException($request);
    }

    $portalLink = "";
    if (version_compare($version, 8) >= 0) {
      $portalLink = '/portal/8.0/doc';
    }
    return $this->view->render($response, 'doc/doc.twig', [
      'version' => $version,
      'docProvider' => $docProvider,
      'documentUrl' => $doc->getRessourceUrl() . '?v=' . time(),
      'currentNiceUrlPath' => $document,
      'portalLink' => $portalLink
    ]);
  }

  private function documentationBasedOnReadTheDocs(string $version): bool
  {
    if ($version == 'nightly-7.0') {
      return false;
    }
    if (version_compare($version, 9) >= 0) {
      return true;
    }
    $releaseType = ReleaseType::byKey($version);
    if ($releaseType != null && $releaseType->isDevRelease()) {
      return true;
    }
    return false;
  }

  private function resolveNewDocUrl($baseUrl, $document, Version $version): string
  {
    if (empty($document)) {
      return "$baseUrl/index.html";
    }
    if ($document == 'migration-notes') {
      return "$baseUrl/axonivy/migration/index.html";
    }
    if ($document == 'release-notes') {
      return "$baseUrl/axonivy/release-notes/index.html";
    }
    if ($document == 'new-and-noteworthy') {
      $newsLink = '/news';
      if (!str_contains($version->getVersionNumber(), "nightly")) {
        if ($version->isMinor() || $version->isBugfix()) {
          $newsLink .= '/' . $version->getMinorVersion();
        }
      }
      return $newsLink;
    }
    return '';
  }
}
