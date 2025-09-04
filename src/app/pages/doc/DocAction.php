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
    $docName = $args['document'] ?? '';

    $lang = $this->evaluateLanguage($docName);
    $hasLang = $this->hasLanguage($docName);
    $docName = $this->evaluateDocName($docName, $lang);
    $docPath = $this->evaluateDocPath($docName);

    // special treatment when using a major version e.g. 8/9/10
    if (!str_contains($version, '.') && is_numeric($version)) {
      $releaseInfo = ReleaseInfoRepository::getBestMatchingVersion($version);
      if ($releaseInfo == null) {
        throw new NotFoundException();
      }      
      return Redirect::to($response, $releaseInfo->getDocProvider()->getLanguageMinorUrl($lang) . $docPath);
    }

    // special treatement for dev, sprint, nightly
    if ($version == "dev" || $version == "sprint" || $version == "nightly") {
      $url = DocProvider::getNewestDocProvider()->getLanguageMinorUrl($lang);      
      return Redirect::to($response, $url . $docPath);
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
      return Redirect::to($response, $docProvider->getLanguageMinorUrl($lang) . $docPath);
    }

    // special treatement for latest
    if ($version == "latest") {
      $releaseInfo = ReleaseInfoRepository::getLatestLongTermSupport();
      if ($releaseInfo == null) {
        throw new NotFoundException();
      }
      return Redirect::to($response, $releaseInfo->getDocProvider()->getLanguageMinorUrl($lang) . $docPath);
    }

    $v = new Version($version);
    $version = $v->getMinorVersion();
    $docProvider = new DocProvider($version);
    if (!$docProvider->exists()) {
      throw new HttpNotFoundException($request);      
    }

    // redirect to minor version if access is not via minor version
    if ($args['version'] != $version) {
      return Redirect::to($response, $docProvider->getLanguageMinorUrl($lang) . $docPath);
    }

    if ($this->documentationBasedOnReadTheDocs($version))
    {
      $newDocUrl = $this->resolveNewDocUrl($docProvider->getLanguageOverviewUrl($lang), $docName, new Version($version), $hasLang);
      if (empty($newDocUrl)) {
        throw new HttpNotFoundException($request);
      } else {
        return Redirect::to($response, $newDocUrl);
      }
    }

    // legacy, before 9
    $document = null;
    if (!empty($docName)) {
      if ($docName == 'ReleaseNotes.html') {
        return Redirect::to($response, 'release-notes');
      }
      $document = $docProvider->findDocumentByNiceUrlPath($docName);
    } else {      
      $document = $docProvider->getOverviewDocument();
    }

    if ($document == null) {
      throw new HttpNotFoundException($request);
    }

    $portalLink = "";
    if (version_compare($version, 8) >= 0) {
      $portalLink = '/portal/8.0/doc';
    }
    return $this->view->render($response, 'doc/doc.twig', [
      'version' => $version,
      'docProvider' => $docProvider,
      'documentUrl' => $document->getLanguageResourceUrl($lang) . '?v=' . time(),
      'currentNiceUrlPath' => $docPath,
      'portalLink' => $portalLink
    ]);
  }

  private function evaluateLanguage(string $docName) : string 
  {
    if (empty($docName)) 
    {
      return DocProvider::DEFAULT_LANGUAGE;
    }
    $path = explode('/', $docName);
    $lang = $path[0];
    if (strlen($lang) != 2) 
    {
      return DocProvider::DEFAULT_LANGUAGE;
    }
    return $lang;
  }

  private function hasLanguage(string $docName) : bool 
  {
    if (empty($docName)) 
    {
      return false;
    }
    $path = explode('/', $docName);
    $lang = $path[0];
    return strlen($lang) == 2;
  }

  private function evaluateDocName(string $docName, string $lang) : string 
  {
    $prefix = $lang;
    if ($docName === $prefix) 
    {
      return "";
    }
    $prefix = $prefix . '/';
    if (substr($docName, 0, strlen($prefix)) == $prefix) 
    {
      return substr($docName, strlen($prefix));
    }
    return $docName;
  }

  private function evaluateDocPath(string $docName) : string 
  {
    if (empty($docName)) 
    {
      return "";
    }
    return '/' . $docName;
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

  private function resolveNewDocUrl($baseUrl, $document, Version $version, bool $hasLang): string
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
    if ($hasLang) {
      return '';
    }
    return "$baseUrl/$document";
  }
}
