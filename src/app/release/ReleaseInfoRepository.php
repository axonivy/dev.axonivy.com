<?php
namespace app\release;

use app\release\model\ReleaseInfo;
use app\release\model\Version;
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
    
    public static function getLatestNightly(): ?ReleaseInfo
    {
        $fileNames = glob(IVY_NIGHTLY_RELEASE_DIRECTORY . DIRECTORY_SEPARATOR . '*.zip');
        return new ReleaseInfo('nightly', $fileNames);
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
                $fileNames = glob($directory . '/downloads/*.zip');
                $releaseInfos[] = new ReleaseInfo($versionNumber, $fileNames);
            }
        }
        $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionOldestFirst($releaseInfos);
        return $releaseInfos;
    }
    
}

