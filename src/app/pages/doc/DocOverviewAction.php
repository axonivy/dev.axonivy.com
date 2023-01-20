<?php

namespace app\pages\doc;

use app\domain\doc\DocProvider;
use Slim\Psr7\Response;
use Slim\Views\Twig;
use app\domain\ReleaseType;
use app\domain\ReleaseInfo;

class DocOverviewAction
{
  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, Response $response, $args)
  {
    $ltsVersions = ReleaseType::LTS()->allReleaseInfos();
    $leadingEdgeVersions = ReleaseType::LE()->allReleaseInfos();

    return $this->view->render($response, 'doc/overview.twig', [
      'docLinksLTS' => $this->docLinks($ltsVersions),
      'docLinksLE' => $this->docLinks($leadingEdgeVersions),
      'docLinksDev' => [new DocLink(DocProvider::getNewestDocProvider())]
    ]);
  }

  private function docLinks(array $releaseInfos): array
  {
    return array_map(fn (ReleaseInfo $releaseInfo) => new DocLink($releaseInfo->getDocProvider()), $releaseInfos);
  }
}

class DocLink
{
  public string $url;
  public string $displayText;
  public array $releaseDocuments;

  public function __construct(DocProvider $docProvider)
  {
    $this->url = $docProvider->getMinorUrl();
    $this->displayText = basename($this->url);
    $this->releaseDocuments = $docProvider->getQuickDocuments();
  }
}
