<?php

namespace app\pages\download;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Request;
use Slim\Views\Twig;
use app\Config;
use app\domain\Artifact;
use app\domain\ReleaseInfo;
use app\domain\ReleaseType;
use app\domain\Version;

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

    $leadingEdgeVersion = "";
    $leadingEdge = ReleaseType::LE()->releaseInfo();
    if ($leadingEdge != null) {
      $leadingEdgeVersion = $leadingEdge->getVersion()->getMinorVersion();
    }

    return $this->view->render($response, 'download/download.twig', [
      'designerArtifacts' => $loader->designerArtifacts(),
      'engineArtifacts' => $loader->engineArtifacts(),

      'vscodeExtensionLink' => $loader->vscodeExtensionLink(),

      'headerTitle' => $loader->headerTitle(),
      'headerSubTitle' => $releaseType->headline(),
      'banner' => $releaseType->banner($version),

      'showOtherVersions' => ReleaseType::isLTS($releaseType),
      'devReleases' => $this->devReleases(),

      'archiveLink' => $loader->archiveLink(),
      'versionShort' => $loader->versionShort(),

      'releaseDate' => $loader->releaseDate(),

      'leadingEdgeVersion' => $leadingEdgeVersion,

      'releaseNotesLink' => $loader->releaseNotesLink()
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
    $rt = ReleaseType::byKey($version);
    if ($rt != null) {
      return $rt;
    }
    return ReleaseType::VERSION($version);
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

  function vscodeExtensionLink(): string;

  function headerTitle(): string;

  function versionShort(): string;

  function archiveLink(): string;

  function releaseNotesLink(): string;

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

  public function vscodeExtensionLink(): string
  {
    return '';
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

  public function releaseNotesLink(): string
  {
    return '';
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

  public function vscodeGetMajorVersion(): bool
  {
    if ($this->releaseType->isDevRelease()) {
     return version_compare($this->getDevVersion()->getMinorVersion(), Config::VSCODE_EXTENSION_SINCE_VERSION, '>=');
    } 
    return version_compare($this->releaseInfo->getVersion()->getVersionNumber(), Config::VSCODE_EXTENSION_SINCE_VERSION, '>=');
  }

  public function designerArtifacts(): array
  {
    if ($this->vscodeGetMajorVersion()) {
      $artifacts = [
        $this->createDownloadArtifact('VS Code Extension', '/images/icons/vscode.svg', Artifact::PRODUCT_NAME_VSCODE_EXTENSION, Artifact::TYPE_VSCODE)
      ];
      return array_filter($artifacts);
    }

    $artifacts = [
      $this->createDownloadArtifact('Windows', 'fa-brands fa-windows', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_WINDOWS),
      $this->createDownloadArtifact('Linux', 'fa-brands fa-linux', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_LINUX),
      $this->createDownloadArtifact('macOS', 'fa-brands fa-apple', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC),
      $this->createDownloadArtifact('macOS', 'fa-brands fa-apple', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC_BETA),
      $this->createDownloadArtifact('macOS', 'fa-brands fa-apple', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC_BETA_NEW)
    ];
    return array_filter($artifacts);
  }

  public function engineArtifacts(): array
  {
    $artifacts = [
      $this->createDownloadArtifact('Windows', 'fa-brands fa-windows', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_WINDOWS),
      $this->createDownloadArtifact('Docker', 'fa-brands fa-docker', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DOCKER),
      $this->createDownloadArtifact('Linux', 'fa-brands fa-linux', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_ALL)
    ];
    return array_filter($artifacts);
  }

  public function vscodeExtensionLink(): string
  {
    if ($this->vscodeGetMajorVersion()) {
      $version = $this->releaseInfo->getVersion()->getMajorVersion();
      if ($this->releaseType->isDevRelease()) {
        return Config::VSCODE_MARKETPLACE_URL . "-". $this->getDevVersion()->getMajorVersion();
      }
      return Config::VSCODE_MARKETPLACE_URL . "-" . $version;
    }
    return '';
  }

  private function createDownloadArtifact($name, $icon, $productName, $type): ?DownloadArtifact
  {
    if ($productName === Artifact::PRODUCT_NAME_VSCODE_EXTENSION) {
      $vscodeMarketplaceUrl = $this->vscodeExtensionLink();
      $version = $this->releaseInfo->getVersion();
      $description = $this->releaseType->isDevRelease()
        ? $version->getVersionNumber()
        : $version->getBugfixVersion() . ' ' . $this->releaseType->shortName();
      return new DownloadArtifact(
        $name,
        $description,
        $vscodeMarketplaceUrl,
        'VS Code Marketplace',
        $icon,
        $vscodeMarketplaceUrl
      );
    } 

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

  public function getDevVersion(): Version
  {
    if ($this->releaseType->isDevRelease()) {
      $artifacts = $this->releaseInfo->getArtifacts();
      if (!empty($artifacts)) {
        $firstArtifact = $artifacts[0];
        return $firstArtifact->getVersion();
      }
    }
    return $this->releaseInfo->getVersion();
  }

  private function minorVersion(): string
  {
    return $this->releaseType->isDevRelease() ? '' : ' ' . $this->releaseInfo->minorVersion();
  }

  public function archiveLink(): string
  {
    return $this->releaseType->archiveLink($this->releaseInfo);
  }

  public function releaseNotesLink(): string
  {
    return $this->releaseInfo->getDocProvider()->getReleaseNotes()->getUrl();
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
