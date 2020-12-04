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
    $devVersions = $this->devVersions();

    return $this->view->render($response, 'doc/overview.twig', [
      'docLinksLTS' => $this->docLinks($ltsVersions),
      'docLinksLE' => $this->docLinks($leadingEdgeVersions),
      'docLinksDEV' => $this->docLinks($devVersions)
    ]);
  }

  private function devVersions(): array
  {
    return array_map(fn (ReleaseType $releaseType) => $releaseType->releaseInfo(), ReleaseType::PROMOTED_DEV_TYPES());
  }

  private function docLinks(array $releaseInfos): array
  {
    return array_map(fn (ReleaseInfo $releaseInfo) => $this->docLink($releaseInfo), $releaseInfos);
  }

  private function docLink(ReleaseInfo $releaseInfo): DocLink
  {
    return new DocLink($releaseInfo->getDocProvider()->getMinorUrl(), $releaseInfo->minorVersion());
  }
}

class DocLink
{
  public string $url;
  public string $displayText;

  public function __construct(string $url, string $displayText)
  {
    $this->url = $url;
    $this->displayText = $displayText;
  }
}
