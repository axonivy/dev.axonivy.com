<?php

namespace app\ui;

use Slim\Exception\HttpNotFoundException;
use app\domain\ReleaseInfoRepository;
use app\domain\ReleaseType;
use app\domain\ReleaseInfo;

class UiArchiveAction
{

  private array $versions;

  public function __construct()
  {
    $this->versions = DownloadArchive::versions();
  }

  public function __invoke($request, $response, $args)
  {
    $version = $args['version'] ?? '';

    $archiveVersion = $this->getCurrentArchiveVersion($version);
    if (empty($archiveVersion)) {
      throw new HttpNotFoundException($request);
    }

    $releaseInfos = array_map(
      fn (ReleaseInfo $releaseInfo) => $this->releaseInfoData($releaseInfo),
      $this->findReleaseInfos($archiveVersion)
    );
    $data = [
      'releaseInfos' => $releaseInfos,
      'categorizedVersions' => $this->createCategorizedVersions(),
      'currentMajorVersion' => $archiveVersion
    ];
    $response->getBody()->write((string) json_encode($data));
    $response = $response->withHeader('Content-Type', 'application/json');
    return $response;
    
  }

  private function getCurrentArchiveVersion(string $version): string
  {
    if (empty($version) && !empty($this->versions)) {
      return ReleaseType::LTS()->releaseInfo()->minorVersion();
    } else if (array_key_exists($version, $this->versions)) {
      return $version;
    }
    return '';
  }

  private function findReleaseInfos(string $version): array
  {
    $releaseTypes = ReleaseType::byArchiveKey($version);
    if (!empty($releaseTypes)) {
      $releaseInfos = [];
      foreach ($releaseTypes as $releaseType) {
        $releaseInfos = array_merge($releaseInfos, $releaseType->allReleaseInfos());
      }
      return $releaseInfos;
    }

    // remove lts versions from leading edge list (e.g. 7.x => 7.0)
    $filterLTS = false;
    if (str_ends_with($version, 'x')) {
      $version = substr($version, 0, -1);
      $filterLTS = true;
    }

    $releaseInfos = ReleaseInfoRepository::getMatchingVersions($version);

    if ($filterLTS) {
      $minorVersion = $version . '0';
      $releaseInfos = array_filter($releaseInfos, fn (ReleaseInfo $releaseInfo) => !str_starts_with($releaseInfo->versionNumber(), $minorVersion));
    }
    return self::filterVirtualVersions($releaseInfos);
  }

  private function releaseInfoData(ReleaseInfo $releaseInfo): array
  {
    $artifacts = $releaseInfo->getArtifacts();

    return [
      'version' => $releaseInfo->versionNumber(),
      'releaseDate' => $releaseInfo->getReleaseDate(),
      'releaseNotes' => $releaseInfo->getDocProvider()->getReleaseNotes()->getUrl(),
      'designerArtifacts' => array_values(array_map(
        fn ($artifact) => $this->artifactData($artifact),
        array_filter(
          $artifacts,
          fn ($artifact) => in_array($artifact->getProductName(), ['designer', 'vscode-extension'])
        )
      )),
      'engineArtifacts' => array_values(array_map(
        fn ($artifact) => $this->artifactData($artifact),
        array_filter(
          $artifacts,
          fn ($artifact) => $artifact->getProductName() === 'engine'
        )
      )),
    ];
  }

  private function artifactData($artifact): array
  {
    return [
      'name' => $artifact->getFileName(),
      'url' => $artifact->getDownloadUrl(),
      'filename' => $artifact->getFileName(),
      'permalink' => $artifact->getPermalink(),
    ];
  }

  private function createCategorizedVersions(): array
  {
    $categorizedVersions = [
      ReleaseType::MILESTONE()->archiveKey() => [],
      ReleaseType::LE()->name() => [],
      ReleaseType::LTS()->name() => [],
      'UNSUPPORTED' => []
    ];

    foreach ($this->versions as $version => $description) {
      $versionLink = new VersionLink($version, $description);
      $type = $description;
      
      if (isset($categorizedVersions[$type])) {
        $categorizedVersions[$type][] = $versionLink;
      } else {
        $categorizedVersions['UNSUPPORTED'][] = $versionLink;
      }
    }

    return array_filter($categorizedVersions, fn($category) => !empty($category));
  }

  private static function filterVirtualVersions(array $releaseInfos): array
  {
    return array_values(array_filter($releaseInfos, fn (ReleaseInfo $releaseInfo) => $releaseInfo->getVersion()->isBugfix()));
  }
}

class DownloadArchive
{

  private const RELEASE_TRAIN_MILESTONE_PATTERN = '/^\d+\.\d+\.\d+-m\d+$/i';

  private static function toVersion(ReleaseInfo $releaseInfo): string
  {
    $v = $releaseInfo->versionNumber();
    $version = $releaseInfo->getVersion();

    $releaseType = ReleaseType::byKey($v);
    if ($releaseType != null) {
      return $releaseType->archiveKey();
    }

    if (preg_match(self::RELEASE_TRAIN_MILESTONE_PATTERN, $v) === 1) {
      return ReleaseType::MILESTONE()->archiveKey();
    }

    if (version_compare($v, 6) <= 0) {
      return $version->getMinorVersion();
    } else if (version_compare($v, 6.1) >= 0 && version_compare($v, 7) < 0) {
      return '6.x';
    } else if (version_compare($v, 7) >= 0 && version_compare($v, 7.1) < 0) {
      return '7.0';
    } else if (version_compare($v, 7.1) >= 0 && version_compare($v, 8) < 0) {
      return '7.x';
    } else {
      $majorNumber = $version->getMajorVersion();
      if ($majorNumber % 2 == 0) {
        return "$majorNumber.0";
      } else {
        return $majorNumber;
      }
    }
  }

  public static function versions(): array
  {
    $releaseInfos = ReleaseInfoRepository::getAvailableReleaseInfos();
    $versions = array_map(fn (ReleaseInfo $releaseInfo) => self::toVersion($releaseInfo), $releaseInfos);
    $versions = array_unique($versions);
    $versions = array_reverse($versions);
    $versions = array_flip($versions);
    $versions = array_fill_keys(array_keys($versions), 'UNSUPPORTED');
    $versions = self::markUnstableMilestones($versions);
    $versions = self::markReleaseType(ReleaseType::LE(), $versions);
    $versions = self::markReleaseType(ReleaseType::LTS(), $versions);
    return $versions;
  }

  private static function markUnstableMilestones(array $versions): array
  {
    foreach (array_keys($versions) as $version) {
      if ($version === ReleaseType::MILESTONE()->archiveKey() || preg_match(self::RELEASE_TRAIN_MILESTONE_PATTERN, $version) === 1) {
        $versions[$version] = ReleaseType::MILESTONE()->archiveKey();
      }
    }
    return $versions;
  }

  private static function markReleaseType(ReleaseType $releaseType, array $versions)
  {
    $releaseInfos = $releaseType->allReleaseInfos();
    foreach ($releaseInfos as $releaseInfo) {
      foreach (array_keys($versions) as $version) {
        if ($version == $releaseInfo->getVersion()->getMajorVersion()) {
          $versions[$version] = $releaseType->name();
        }
      }
    }
    return $versions;
  }
}

class VersionLink
{

  public string $id;

  private string $productEdition;

  public function __construct(string $id, string $productEdition)
  {
    $this->id = $id;
    $this->productEdition = $productEdition;
  }

  public function getUrl(): string
  {
    return '/download/archive/' . $this->id;
  }

  public function getDisplayText(): string
  {
    return $this->id . ' (' . $this->productEdition . ')';
  }
}
