<?php
namespace app\release\model;

use app\util\ArrayUtil;

class ReleaseInfoRepository
{
    public static function getReleaseInfo(string $versionNumber): ?ReleaseInfo
    {
        $allReleaseInfos = self::getAvailableReleaseInfos();
        foreach ($allReleaseInfos as $releaseInfo) {
            if ($releaseInfo->getVersion()->getVersionNumber() == $versionNumber) {
                return $releaseInfo;
            }
        }
        return null;
    }
    
    public static function getLatestReleaseInfoOfMinor(string $minorVersion): ?ReleaseInfo
    {
        $versions = [];
        $releaseInfos = self::getAvailableReleaseInfos();
        foreach ($releaseInfos as $releaseInfo) {
            if ($releaseInfo->getVersion()->getMinorVersion() == $minorVersion) {
                $versions[$releaseInfo->getVersion()->getVersionNumber()] = $releaseInfo;
            }
        }
        
        uksort($versions, function ($key1, $key2) { return version_compare($v2, $v1); });
        
        return ArrayUtil::getLastElementOrNull($versions);
    }
    
    public static function getLatestReleaseInfo(): ?ReleaseInfo {
        $releaseInfos = self::getAvailableReleaseInfos();
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }
    
    public static function getLatestLeadingEdge(string $productName): ?ReleaseInfo
    {
        $releaseInfos = self::getAvailableReleaseInfosByProductName($productName);
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }
    
    public static function getLatestLongTermSupport(string $productName): ?ReleaseInfo
    {
        $releaseInfos = self::getAvailableReleaseInfosByProductName($productName);
        $releaseInfos = array_filter($releaseInfos, function(ReleaseInfo $releaseInfo) {
            return $releaseInfo->getVersion()->isLongTermSupportVersion();
        });
            return ArrayUtil::getLastElementOrNull($releaseInfos);
    }
    
    public static function getNightlyArtifacts(): array
    {
        return Artifact::createArtifacts(IVY_NIGHTLY_RELEASE_DIRECTORY, CDN_HOST_NIGHTLY, PERMALINK_NIGHTLY);
    }
    
    public static function getSprintArtifacts(): array
    {
        return Artifact::createArtifacts(IVY_SPRINT_RELEASE_DIRECTORY, CDN_HOST_SPRINT, PERMALINK_SPRINT);
    }
    
    /**
     * Returns all available minor versions.
     *
     * e.g. ['3.9', '4.2', '6.0', '6.1']
     *
     * @return string[]
     */
    public static function getMinorVersions(): array
    {
        $releaseInfos = self::getAvailableReleaseInfos();
        $minorVersions = [];
        foreach ($releaseInfos as $releaseInfo) {
            $minorVersion = $releaseInfo->getVersion()->getMinorVersion();
            $minorVersions[$minorVersion] = $minorVersion;
        }
        return array_values($minorVersions);
    }
    
    public static function getAvailableReleaseInfosByProductName(string $productName): array
    {
        $allReleaseInfos = self::getAvailableReleaseInfos();
        
        $releaseInfos = [];
        foreach ($allReleaseInfos as $releaseInfo) {
            if ($releaseInfo->hasVariantWithProductName($productName)) {
                $releaseInfos[] = $releaseInfo;
            }
        }
        
        return $releaseInfos;
    }
    
    /**
     * @return ReleaseInfo[]
     */
    public static function getAvailableReleaseInfos(): array
    {
        $releaseInfos = [];
        $directories = array_filter(glob(IVY_RELEASE_DIRECTORY . DIRECTORY_SEPARATOR . '*'), 'is_dir');
        foreach ($directories as $directory) {
            // skip not ready releases (still uploading)
            $releaseNotReadyFile = $directory . DIRECTORY_SEPARATOR . 'NotReady.txt';
            if (file_exists($releaseNotReadyFile)) {
                continue;
            }
            
            // TODO?
            // skip releases without release info (no official/public releases)
            //$releaseInfoFile = $directory . DIRECTORY_SEPARATOR . 'ReleaseInfo.txt';
            //if (!file_exists($releaseInfoFile)) {
            //    continue;
            //}
            
            $versionNumber = basename($directory);
            
            if (Version::isValidVersionNumber($versionNumber)) {
                if ($versionNumber != '0.0.1') { // special folder
                    
                    $safeVersion = '';
                    if (isset(UNSAFE_RELEASES[$versionNumber])) {
                        $safeVersion = UNSAFE_RELEASES[$versionNumber];
                    }
                    
                    $fileNames = glob($directory . '/downloads/*.zip');
                    $releaseInfos[] = new ReleaseInfo($versionNumber, $fileNames, $safeVersion);
                }
            }
        }
        $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionOldestFirst($releaseInfos);
        return $releaseInfos;
    }
    
}

