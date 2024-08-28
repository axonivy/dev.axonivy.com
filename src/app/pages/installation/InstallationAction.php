<?php

namespace app\pages\installation;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\Version;
use app\domain\util\Redirect;
use app\domain\Artifact;

class InstallationAction
{
  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke(Request $request, $response, $args)
  {
    $product = $request->getQueryParams()['product'] ?? ''; // e.g. 'engine', 'designer'
    $type = $request->getQueryParams()['type'] ?? ''; // e.g. 'docker'
    $version = $request->getQueryParams()['version'] ?? ''; // e.g. '8.0.1', '9.0.1'
    $downloadUrl = $request->getQueryParams()['downloadUrl'] ?? ''; // e.g. https://download/... -> case of docker empty!
    $startDownload = $request->getQueryParams()['startDownload'] ?? 'true'; // e.g. wether to start the download or not
    if ($startDownload == 'false') {
      $startDownload = false;
    } else {
      $startDownload = true;
    }

    if (empty($product) || empty($version) || empty($type)) {
      return Redirect::to($response, '/download');
    }

    $minorVersion = (new Version($version))->getMinorVersion();
    $bugfixVersion = (new Version($version))->getBugfixVersion();

    $moreInfoLink = "";

    // TODO we should move this to artifact
    $title = 'Install Axon Ivy Designer ';
    if ($product == Artifact::PRODUCT_NAME_ENGINE) {
      $title = 'Install Axon Ivy Engine ';      
      if ($type == Artifact::TYPE_DOCKER) {
        $title .= ' for Docker';
        $startDownload = false;
        if (version_compare($minorVersion, "9.2") < 0) {
          $moreInfoLink = "/doc/$minorVersion/engine-guide/getting-started/docker.html";
        } else {
          $moreInfoLink = "/doc/$minorVersion/engine-guide/getting-started/docker/index.html";
        }
      }
    }

    if ($type == Artifact::TYPE_WINDOWS) {
      $title .= ' for Windows';
    }
    if ($type == Artifact::TYPE_LINUX || $type == Artifact::TYPE_ALL) {
      $title .= ' for Linux';
    }
    if ($type == Artifact::TYPE_MAC || $type == Artifact::TYPE_MAC_BETA ) {
      $title .= ' for Mac';
    }

    return $this->view->render($response, 'installation/installation.twig', [
      'downloadUrl' => $downloadUrl,
      'minorVersion' => $minorVersion,
      'title' => $title,
      'type' => $type,
      'product' => $product,
      'bugfixVersion' => $bugfixVersion,
      'startDownload' => $startDownload,
      'moreInfoLink' => $moreInfoLink,
    ]);
  }
}
