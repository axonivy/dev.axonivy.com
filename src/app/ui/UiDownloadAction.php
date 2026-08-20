<?php

namespace app\ui;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Request;
use app\Config;
use app\domain\Artifact;
use app\domain\ReleaseInfo;
use app\domain\ReleaseType;
use app\domain\Version;
use app\domain\util\Redirect;

class UiDownloadAction
{
  public function __invoke(Request $request, $response, $args)
  {
    $version = $args['version'] ?? '';

    if ($version == 'sprint') {
      return Redirect::to($response, '/download/milestone');
    }

    if (!empty($version)) {
      $releaseType = $this->releaseType($version);
      if ($releaseType == null) {
        throw new HttpNotFoundException($request);
      }
    }

    $ltsReleases = ReleaseType::LTS()->allReleaseInfos();
    $data = [
      'ltsCurrent' => $this->releaseData(array_pop($ltsReleases), ReleaseType::LTS()),
      'ltsMaintenance' => $this->releaseData(array_shift($ltsReleases), ReleaseType::LTS()),
      'le' => $this->releaseData(ReleaseType::LE()->releaseInfo(), ReleaseType::LE()),
      'dev' => $this->releaseData(ReleaseType::DEV()->releaseInfo(), ReleaseType::DEV()),
    ];

    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
  }

  private function releaseData(?ReleaseInfo $releaseInfo, ReleaseType $releaseType): array
  {
    if ($releaseInfo == null) {
      return [];
    }

    $loader = new ReleaseInfoLoader($releaseType, $releaseInfo);
    return [[
      'version' => $loader->version(),
      'versionShort' => $loader->versionShort(),
      'releaseDate' => $loader->releaseDate(),
      'releaseNotesLink' => $loader->releaseNotesLink(),
      'docLink' => $loader->docLink(),
      'vscodeExtensionLink' => $loader->vscodeExtensionLink(),
      'designerArtifacts' => $loader->designerArtifacts(),
      'engineArtifacts' => $loader->engineArtifacts(),
    ]];
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

interface Loader
{
  function version(): string;

  function versionShort(): string;

  function releaseDate(): string;

  function releaseNotesLink(): string;

  function vscodeExtensionLink(): string;

  function docLink(): string;
  
  function designerArtifacts(): array;

  function engineArtifacts(): array;
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

  public function version(): string
  {
    return $this->releaseType->name();
  }

  public function versionShort(): string
  {
    return $this->releaseType->shortName();
  }

  public function releaseNotesLink(): string
  {
    return '';
  }

  public function docLink(): string
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
        $this->createDownloadArtifact('VS Code Extension', Artifact::PRODUCT_NAME_VSCODE_EXTENSION, Artifact::TYPE_VSCODE)
      ];
      return array_values(array_filter($artifacts));
    }

    $artifacts = [
      $this->createDownloadArtifact('Windows', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_WINDOWS),
      $this->createDownloadArtifact('Linux', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_LINUX),
      $this->createDownloadArtifact('macOS', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC),
      $this->createDownloadArtifact('macOS', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC_BETA),
      $this->createDownloadArtifact('macOS', Artifact::PRODUCT_NAME_DESIGNER, Artifact::TYPE_MAC_BETA_NEW)
    ];
    return array_values(array_filter($artifacts));
  }

  public function engineArtifacts(): array
  {
    $artifacts = [
      $this->createDownloadArtifact('Windows', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_WINDOWS),
      $this->createDownloadArtifact('Docker', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_DOCKER),
      $this->createDownloadArtifact('Linux', Artifact::PRODUCT_NAME_ENGINE, Artifact::TYPE_ALL)
    ];
    return array_values(array_filter($artifacts));
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

  private function createDownloadArtifact($name, $productName, $type): ?DownloadArtifact
  {
    if ($productName === Artifact::PRODUCT_NAME_VSCODE_EXTENSION) {
      $vscodeMarketplaceUrl = $this->vscodeExtensionLink();
      return new DownloadArtifact(
        $name,
        $vscodeMarketplaceUrl,
        'VS Code Marketplace',
        $vscodeMarketplaceUrl,
      );
    } 

    $artifact = $this->releaseInfo->getArtifactByProductNameAndType($productName, $type);
    if ($artifact == null) {
      return null;
    }

    $permalink = $artifact->getPermalink();
    return new DownloadArtifact($name, $artifact->getInstallationUrl(), $artifact->getFileName(), $permalink);
  }

  public function version(): string
  {
    return $this->releaseInfo->versionNumber();
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

  public function releaseNotesLink(): string
  {
    return $this->releaseInfo->getDocProvider()->getReleaseNotes()->getUrl();
  }

  public function docLink(): string
  {
    return $this->releaseInfo->getDocProvider()->getOverviewUrl();
  }

  public function releaseDate(): string
  {
    return $this->releaseInfo->getReleaseDate();
  }
}

class DownloadArtifact
{
  public string $name;

  public string $url;

  public string $filename;

  public string $permalink;

  public function __construct($name, $url, $filename, $permalink)
  {
    $this->name = $name;
    $this->url = $url;
    $this->filename = $filename;
    $this->permalink = $permalink;
  }
}
