<?php

namespace app\ui;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\domain\ReleaseInfoRepository;
use app\domain\doc\DocProvider;
use app\domain\util\Redirect;
use app\domain\ReleaseType;
use app\domain\Version;
use DI\NotFoundException;

class UiDocLegacyAction
{

  public function __invoke($request, Response $response, $args)
  {
    $version = $args['version'];
    $docName = $args['document'] ?? '';

    $lang = $this->evaluateLanguage($docName);
    $hasLang = $this->hasLanguage($docName);
    $docName = $this->evaluateDocName($docName, $lang);
    $docPath = $this->evaluateDocPath($docName);

    $v = new Version($version);
    $version = $v->getMinorVersion();
    $docProvider = new DocProvider($version);
    if (!$docProvider->exists()) {
      throw new HttpNotFoundException($request);      
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

    $data = [
      'version' => $version,
      'releaseDocuments' => $this->docLinksFromProvider($docProvider),
      'externalBooks' => $this->externalBooksFromProvider($docProvider),
      'documentUrl' => $document->getLanguageResourceUrl($lang) . '?v=' . time(),
      'currentNiceUrlPath' => $docPath,
    ];
    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
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

  private function docLinksFromProvider(DocProvider $docProvider): DocVersionLinks
  {
    $version = basename($docProvider->getMinorUrl());
    $docLinks = [];

    foreach ($docProvider->getReleaseDocuments() as $doc) {
      $docLinks[] = new DocLink($doc->getUrl(), $doc->getName());
    }

    return new DocVersionLinks($version, $docLinks);
  }

  private function externalBooksFromProvider(DocProvider $docProvider): DocVersionLinks
  {
    $version = basename($docProvider->getMinorUrl());
    $docLinks = [];

    foreach ($docProvider->getExternalBooks() as $doc) {
      $docLinks[] = new DocLink($doc->getUrl(), $doc->getName());
    }

    return new DocVersionLinks($version, $docLinks);
  }
}

class DocVersionLinks
{
  public string $version;
  public array $links;

  public function __construct(string $version, array $links)
  {
    $this->version = $version;
    $this->links = $links;
  }
}

class DocLink
{
  public string $url;
  public string $text;

  public function __construct(string $url, string $text)
  {
    $this->url = $url;
    $this->text = $text;
  }
}
