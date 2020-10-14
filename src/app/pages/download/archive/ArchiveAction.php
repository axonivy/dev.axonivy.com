<?php
namespace app\pages\download\archive;

use Slim\Exception\HttpNotFoundException;
use Slim\Views\Twig;
use app\domain\ReleaseInfoRepository;
use app\domain\util\StringUtil;
use app\domain\ReleaseType;
use app\domain\ReleaseInfo;

class ArchiveAction
{

    private Twig $view;

    private array $versions;

    public function __construct(Twig $view)
    {
        $this->view = $view;
        $this->versions = DownloadArchive::versions();
    }

    public function __invoke($request, $response, $args)
    {
        $version = $args['version'] ?? '';

        $archiveVersion = $this->getCurrentArchiveVersion($version);
        if (empty($archiveVersion)) {
            throw new HttpNotFoundException($request);
        }

        $releaseInfos = $this->findReleaseInfos($archiveVersion);
        return $this->view->render($response, 'download/archive/archive.twig', [
            'releaseInfos' => $releaseInfos,
            'versionLinks' => $this->createLinks(),
            'currentMajorVersion' => $archiveVersion
        ]);
    }

    private function getCurrentArchiveVersion(string $version): string
    {
        if (empty($version) && ! empty($this->versions)) {
            return ReleaseType::LTS()->releaseInfo()->minorVersion();
        } else if (array_key_exists($version, $this->versions)) {
            return $version;
        }
        return '';
    }

    private function findReleaseInfos(string $version): array
    {
        $releaseTypes = ReleaseType::byArchiveKey($version);
        if (! empty($releaseTypes)) {
            $releaseInfos = [];
            foreach ($releaseTypes as $releaseType) {
                $releaseInfos = array_merge($releaseInfos, $releaseType->allReleaseInfos());
            }
            return $releaseInfos;
        }
        
        // remove lts versions from leading edge list (e.g. 7.x => 7.0)
        $filterLTS = false;
        if (StringUtil::endsWith($version, 'x')) {
            $version = substr($version, 0, - 1);
            $filterLTS = true;
        }
        
        $releaseInfos = ReleaseInfoRepository::getMatchingVersions($version);
        
        if ($filterLTS) {
            $minorVersion = $version . '0';
            $releaseInfos = array_filter($releaseInfos, fn (ReleaseInfo $releaseInfo) => ! StringUtil::startsWith($releaseInfo->versionNumber(), $minorVersion));
        }
        return self::filterVirtualVersions($releaseInfos);
    }

    private function createLinks(): array
    {
        $links = [];
        foreach ($this->versions as $version => $description) {
            $links[] = new VersionLink($version, $description);
        }
        return $links;
    }

    private static function filterVirtualVersions(array $releaseInfos): array
    {
        return array_filter($releaseInfos, fn (ReleaseInfo $releaseInfo) => $releaseInfo->getVersion()->isBugfix());
    }
}

class DownloadArchive
{

    private static function toVersion(ReleaseInfo $releaseInfo): string
    {
        $v = $releaseInfo->versionNumber();
        $version = $releaseInfo->getVersion();

        $releaseType = ReleaseType::byKey($v);
        if ($releaseType != null) {
            return $releaseType->archiveKey();
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
        $versions = self::markReleaseType(ReleaseType::LE(), $versions);
        $versions = self::markReleaseType(ReleaseType::LTS(), $versions);
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
        return $this->id . ' ('.$this->productEdition.')';
    }
}
