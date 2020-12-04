<?php

namespace app\pages\release;

use Slim\Views\Twig;
use app\domain\ReleaseInfoRepository;

class ReleaseCycleAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke($request, $response, $args)
  {

    $ltsVersions = ReleaseInfoRepository::getLongTermSupportVersions();
    $lts = '';
    foreach ($ltsVersions as $ltsVersion) {
      if (!empty($lts)) {
        $lts .= ' / ';
      }
      $lts .= $ltsVersion->getVersion()->getMinorVersion();
    }

    $leadingEdge = ReleaseInfoRepository::getLeadingEdge();
    $le = $leadingEdge == null ? 'not available' : $leadingEdge->getVersion()->getMinorVersion();

    return $this->view->render($response, 'release/release-cycle.twig', [
      'lts' => $lts,
      'le' => $le
    ]);
  }
}
