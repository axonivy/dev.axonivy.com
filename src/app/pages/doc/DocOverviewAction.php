<?php

namespace app\pages\doc;

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
      'docLinksLE' => $this->docLinks($leadingEdgeVersions)
    ]);
  }

  private function docLinks(array $releaseInfos): array
  {
    return array_map(fn (ReleaseInfo $releaseInfo) => new DocLink($releaseInfo), $releaseInfos);
  }
}

class DocLink
{
  public string $url;
  public string $displayText;
  public array $releaseDocuments;

  public function __construct(ReleaseInfo $releaseInfo)
  {
    $this->url = $releaseInfo->getDocProvider()->getMinorUrl();
    $this->displayText = $releaseInfo->minorVersion();
    $this->releaseDocuments = $releaseInfo->getDocProvider()->getQuickDocuments();
  }
}
