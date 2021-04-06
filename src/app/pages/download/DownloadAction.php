<?php

namespace app\pages\download;

use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\domain\ReleaseInfo;
use Slim\Exception\HttpNotFoundException;
use app\domain\ReleaseType;
use app\domain\Artifact;

class DownloadAction
{

  private Twig $view;

  public function __construct(Twig $view)
  {
    $this->view = $view;
  }

  public function __invoke(Request $request, $response, $args)
  {
    $version = $args['version'] ?? '';

    $releaseType = $this->releaseType($version);
    if ($releaseType == null) {
      throw new HttpNotFoundException($request);
    }

    $loader = $this->createLoader($releaseType);

    return $this->view->render($response, 'download/download.twig', [
      'designerArtifacts' => $loader->designerArtifacts(),
      'engineArtifacts' => $loader->engineArtifacts(),

      'headerTitle' => $loader->headerTitle(),
      'headerSubTitle' => $releaseType->headline(),
      'banner' => $releaseType->banner(),

      'showOtherVersions' => ReleaseType::isLTS($releaseType),
      'devReleases' => $this->devReleases(),

      'archiveLink' => $loader->archiveLink(),
      'versionShort' => $loader->versionShort(),

      'releaseDate' => $loader->releaseDate()
    ]);
  }

  private function devReleases(): array
  {
    $links = [];
    foreach (ReleaseType::PROMOTED_DEV_TYPES() as $devType) {
      $links[] = new Link($devType->downloadLink(), $devType->name());
    }
    return $links;
  }

  private function releaseType(string $version): ?ReleaseType
  {
    if (empty($version)) {
      return ReleaseType::LTS();
    }
    return ReleaseType::byKey($version);
  }

  private function createLoader(ReleaseType $releaseType)
  {
    $releaseInfo = $releaseType->releaseInfo();
    if ($releaseInfo == null) {
      return new ReleaseTypeNotAvailableLoader($releaseType);
    }
    return new ReleaseInfoLoader($releaseType, $releaseInfo);
  }
}

class Link
{
  private $url;
  private $name;

  function __construct(string $url, string $name)
  {
    $this->url = $url;
    $this->name = $name;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getUrl(): string
  {
    return $this->url;
  }
}

interface Loader
{

  function designerArtifacts(): array;

  function engineArtifacts(): array;

  function headerTitle(): string;

  function versionShort(): string;

  function archiveLink(): string;

  function releaseDate(): string;
}

class ReleaseTypeNotAvailableLoader implements Loader
{

  private ReleaseType $releaseType;

  public function __construct(ReleaseType $releaseType)
  {
    $this->releaseType = $releaseType;
  }

  public function designerArtifacts(): array
  {
    return [];
  }

  public function engineArtifacts(): array
  {
    return [];
  }

  public function headerTitle(): string
  {
    return $this->releaseType->name() . " currently not available";
  }

  public function versionShort(): string
  {
    return $this->releaseType->shortName();
  }

  public function archiveLink(): string
  {
    return '/download/archive';
  }

  public function releaseDate(): string
  {
    return "";
  }
}

class ReleaseInfoLoader implements Loader
{

  private ReleaseType $releaseType;

  private ReleaseInfo $releaseInfo;

  public function __construct(ReleaseType $releaseType, ReleaseInfo $releaseInfo)
  {
    $this->releaseType = $releaseType;
    $this->releaseInfo = $releaseInfo;
  }

  public function designerArtifacts(): array
  {
    $artifacts = [
      $this->createDownloadArtifact('Windows', 'fab fa-windows', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_WINDOWS),
      $this->createDownloadArtifact('Linux', 'fab fa-linux', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_LINUX),
      $this->createDownloadArtifact('Mac OS', 'fab fa-apple', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC),
      $this->createDownloadArtifact('macOS', 'fab fa-apple', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC_BETA)
    ];
    return array_filter($artifacts);
  }

  public function engineArtifacts(): array
  {
    $artifacts = [
      $this->createDownloadArtifact('Windows', 'fab fa-windows', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_WINDOWS),
      $this->createDownloadArtifact('Docker', 'fab fa-docker', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DOCKER),
      $this->createDownloadArtifact('Debian', 'fas fa-cube', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DEBIAN),
      $this->createDownloadArtifact('Linux', 'fab fa-linux', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_ALL)
    ];
    return array_filter($artifacts);
  }

  private function createDownloadArtifact($name, $icon, $productName, $type): ?DownloadArtifact
  {
    $artifact = $this->releaseInfo->getArtifactByProductNameAndType($productName, $type);
    if ($artifact == null) {
      return null;
    }

    $description = '';
    $beta = $artifact->isBeta() ? ' BETA' : '';
    if ($this->releaseType->isDevRelease()) {
      $description = $artifact->getVersion()->getVersionNumber() . ' ' . $beta;
    } else {
      $description = $artifact->getVersion()->getBugfixVersion() . ' ' . $this->releaseType->shortName() . $beta;
    }

    $permalink = $artifact->getPermalink();
    return new DownloadArtifact($name, $description, $artifact->getInstallationUrl(), $artifact->getFileName(), $icon, $permalink);
  }

  public function headerTitle(): string
  {
    return "Download " . $this->releaseType->name() . $this->minorVersion();
  }

  public function versionShort(): string
  {
    return $this->releaseType->shortName() . $this->minorVersion();
  }

  private function minorVersion(): string
  {
    return $this->releaseType->isDevRelease() ? '' : ' ' . $this->releaseInfo->minorVersion();
  }

  public function archiveLink(): string
  {
    return $this->releaseType->archiveLink($this->releaseInfo);
  }

  public function releaseDate(): string
  {
    return $this->releaseInfo->getReleaseDate();
  }
}

class DownloadArtifact
{

  public string $name;

  public string $description;

  public string $url;

  public string $filename;

  public string $icon;

  public string $permalink;

  public function __construct($name, $description, $url, $filename, $icon, $permalink)
  {
    $this->name = $name;
    $this->description = $description;
    $this->url = $url;
    $this->filename = $filename;
    $this->icon = $icon;
    $this->permalink = $permalink;
  }
}
