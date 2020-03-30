<?php
namespace app\domain;

use app\domain\util\ArrayUtil;
use app\domain\util\StringUtil;
use app\Config;

class ReleaseInfoRepository
{

    /**
     * release with highest version
     */
    public static function getLatest(): ?ReleaseInfo
    {
        $releaseInfos = self::getAvailableReleaseInfos();
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }

    /**
     * current leading edge
     */
    public static function getLeadingEdge(): ?ReleaseInfo
    {
        $releaseInfo = self::getLatest();
        if ($releaseInfo == null) {
            return null;
        }
        if ($releaseInfo->getVersion()->getMajorVersion() % 2 == 1) {
            return $releaseInfo;
        }
        return null;
    }

    /**
     * lts with highest version
     */
    public static function getLatestLongTermSupport(): ?ReleaseInfo
    {
        $releaseInfos = self::getLongTermSupportVersions();
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }

    /**
     * lts releases
     */
    public static function getLongTermSupportVersions(): array
    {
        $releaseInfos = self::getAvailableReleaseInfos();

        $majorVersions = array_map(fn (ReleaseInfo $releaseInfo) => $releaseInfo->getVersion()->getMajorVersion(), $releaseInfos);
        $uniqueMajorVersions = array_reverse(array_unique($majorVersions));

        $ltsMajorVersions = [];
        foreach ($uniqueMajorVersions as $majorVersion) {
            if ($majorVersion % 2 == 0) {
                $ltsMajorVersions[] = $majorVersion;
            }

            if ($majorVersion == 7) { // when LTS 10.0 has been released, remove this
                $ltsMajorVersions[] = $majorVersion;
            }

            if (count($ltsMajorVersions) == Config::NUMBER_LTS) {
                break;
            }
        }

        $ltsMajorVersions = array_reverse($ltsMajorVersions);
        return array_filter(array_map(fn (string $ltsMajorVersion) => self::findNewestLTSVersion($ltsMajorVersion), $ltsMajorVersions));
    }

    /**
     * version: 7.0.1, 7.0, 7
     */
    private static function findNewestLTSVersion($version): ?ReleaseInfo
    {
        if ($version == 7) { // remove this when LTS 10.0 has been released
            $version = '7.0';
        }

        $releaseInfos = array_reverse(self::getAvailableReleaseInfos());
        foreach ($releaseInfos as $releaseInfo) {
            if ($releaseInfo->getVersion()->isMinor()) {
                continue;
            }
            if (StringUtil::startsWith($releaseInfo->getVersion()->getVersionNumber(), $version)) {
                return $releaseInfo;
            }
        }
        return null;
    }

    public static function getAvailableReleaseInfos(): array
    {
        $releaseInfos = [];
        $directories = array_filter(glob(Config::releaseDirectory() . '/*'), 'is_dir');
        foreach ($directories as $directory) {
            $releaseReadyFile = $directory . '/release.ready';
            if (! file_exists($releaseReadyFile)) {
                continue;
            }

            $versionNumber = basename($directory);
            $artifacts = ArtifactFactory::create($directory);
            $releaseInfos[] = new ReleaseInfo(new Version($versionNumber), $artifacts);
        }
        $releaseInfos = self::sortReleaseInfosByVersionOldestFirst($releaseInfos);
        return $releaseInfos;
    }

    /**
     * 8.0
     * 8.0.3
     */
    public static function isReleased($version): bool
    {
        return self::getBestMatchingVersion($version) != null;
    }

    /**
     * e.g: 7.0.3, 8.0.1, sprint, nightly, dev
     * - 8.0 -> newest 8.0.x
     * - 8 -> newest 8.x
     */
    public static function getBestMatchingVersion(string $version): ?ReleaseInfo
    {
        $versions = self::getMatchingVersions($version);
        $versions = array_reverse($versions);
        return ArrayUtil::getLastElementOrNull($versions);
    }

    public static function getMatchingVersions(string $version): array
    {
        $releaseInfos = self::sortReleaseInfosByVersionNewestFirst(self::getAvailableReleaseInfos());
        $infos = [];
        foreach ($releaseInfos as $info) {
            $versionNumber = $info->getVersion()->getVersionNumber();
            if (StringUtil::startsWith($versionNumber, $version)) {
                $infos[] = $info;
            }
        }
        return $infos;
    }

    private static function sortReleaseInfosByVersionOldestFirst(array $releaseInfos)
    {
        usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
            return version_compare($r1->getVersion()->getVersionNumber(), $r2->getVersion()->getVersionNumber());
        });
        return $releaseInfos;
    }

    private static function sortReleaseInfosByVersionNewestFirst(array $releaseInfos)
    {
        usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
            return version_compare($r2->getVersion()->getVersionNumber(), $r1->getVersion()->getVersionNumber());
        });
        return $releaseInfos;
    }
}
