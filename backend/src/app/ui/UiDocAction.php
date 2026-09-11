<?php

namespace app\ui;

use app\domain\doc\DocProvider;
use Slim\Psr7\Response;
use app\domain\ReleaseType;
use app\domain\ReleaseInfo;

class UiDocAction
{

  public function __invoke($request, Response $response, $args)
  {
    $ltsVersions = ReleaseType::LTS()->allReleaseInfos();
    $leadingEdgeVersions = ReleaseType::LE()->allReleaseInfos();
    $data = [
      'docLinksLTS' => $this->docLinks($ltsVersions),
      'docLinksLE' => $this->docLinks($leadingEdgeVersions),
      'docLinksDev' => [$this->docLinksFromProvider(DocProvider::getNewestDocProvider())]
    ];
    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }

  private function docLinks(array $releaseInfos): array
  {
    return array_map(
      fn (ReleaseInfo $releaseInfo) => $this->docLinksFromProvider($releaseInfo->getDocProvider()),
      $releaseInfos
    );
  }

  private function docLinksFromProvider(DocProvider $docProvider): DocVersionLinks
  {
    $version = basename($docProvider->getMinorUrl());
    $docLinks = [new DocLink($docProvider->getDefaultLanguageMinorUrl(), 'Documentation')];

    foreach ($docProvider->getQuickDocuments() as $doc) {
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
