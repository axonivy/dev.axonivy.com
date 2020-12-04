<?php

namespace app\pages\doc;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\ReleaseInfoRepository;
use app\domain\doc\DocProvider;
use app\domain\util\Redirect;
use app\domain\ReleaseType;
use DI\NotFoundException;
use app\domain\util\StringUtil;

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

    // special treatment when using a major version e.g. 8/9/10
    if (!StringUtil::contains($version, '.') && is_numeric($version)) {
      $releaseInfo = ReleaseInfoRepository::getBestMatchingVersion($version);
      if ($releaseInfo == null) {
        throw new NotFoundException();
      }
      $doc = $args['document'] ?? '';
      if (!empty($doc)) {
        $doc = '/' . $doc;
      }
      return Redirect::to($response, $releaseInfo->getDocProvider()->getMinorUrlOrBugfixUrl() . $doc);
    }

    $docProvider = new DocProvider($version);
    if (!$docProvider->exists()) {
      throw new HttpNotFoundException($request);
    }

    if ($this->documentationBasedOnReadTheDocs($version)) {
      $newDocUrl = $this->resolveNewDocUrl($docProvider->getOverviewUrl(), $args['document']);
      if (empty($newDocUrl)) {
        throw new HttpNotFoundException($request);
      } else {
        return Redirect::to($response, $newDocUrl);
      }
    }

    // legacy, before 9
    $doc = null;
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
    if ($version == 'nightly-7') {
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

  private function resolveNewDocUrl($baseUrl, $document): string
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
      return '/news';
    }
    return '';
  }
}
