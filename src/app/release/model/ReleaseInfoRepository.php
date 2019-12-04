<?php
namespace app\release\model;

use app\util\ArrayUtil;
use app\util\StringUtil;

class ReleaseInfoRepository
{
    public static function getLatest(): ?ReleaseInfo
    {
        $releaseInfos = self::getAvailableReleaseInfos();
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }
    
    public static function getLatestLongTermSupport(): ?ReleaseInfo
    {
        $releaseInfos = self::getAvailableReleaseInfos();
        $releaseInfos = array_filter($releaseInfos, function(ReleaseInfo $releaseInfo) {
            return $releaseInfo->getVersion()->isLongTermSupportVersion();
        });
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }
    
    public static function getAvailableReleaseInfosByProductName(string $productName): array
    {
        $releaseInfos = self::getAvailableReleaseInfos();
        $releaseInfos = array_filter($releaseInfos, function(ReleaseInfo $releaseInfo) use ($productName) {
            return $releaseInfo->hasVariantWithProductName($productName);
        });
        return $releaseInfos;
    }
    
    public static function getAvailableReleaseInfos(): array
    {
        $releaseInfos = [];
        $directories = array_filter(glob(IVY_RELEASE_DIRECTORY . DIRECTORY_SEPARATOR . '*'), 'is_dir');
        foreach ($directories as $directory) {
            // check release.ready files, it is uploaded
            $releaseNotReadyFile = $directory . DIRECTORY_SEPARATOR . 'release.ready';
            if (!file_exists($releaseNotReadyFile)) {
                continue;
            }
            
            $versionNumber = basename($directory);
            // drop e.g. nightly or sprint
            if (!Version::isValidVersionNumber($versionNumber)) {
                continue;
            }
            
            $safeVersion = '';
            if (isset(UNSAFE_RELEASES[$versionNumber])) {
                $safeVersion = UNSAFE_RELEASES[$versionNumber];
            }            
            $releaseInfos[] = self::createReleaseInfo($directory, $versionNumber, $safeVersion);
        }
        $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionOldestFirst($releaseInfos);
        return $releaseInfos;
    }
    
    /**
     * e.g: latest, sprint, nightly
     * special treatment for version like 8.0, will return latest 8.0.x 
     */
    public static function getArtifacts(string $version): array
    {
        if (StringUtil::endsWith($version, '.0')) {
            $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionOldestFirst(self::getAvailableReleaseInfos());
            foreach ($releaseInfos as $info) {
                $v = $info->getVersion()->getVersionNumber();
                if (StringUtil::startsWith($v, $version))
                {
                    $version = $info->getVersion()->getVersionNumber();
                }
            }
        }
        
        $artifactsDirectory = IVY_RELEASE_DIRECTORY . '/' . $version;
        $cdnBaseUrl = CDN_HOST . '/' . $version . '/';
        $permalinkBaseUrl = PERMALINK_BASE_URL . $version . '/';
        
        $releaseInfo = self::createReleaseInfo($artifactsDirectory, '', '');
        
        return self::createArtifactsFromReleaseInfo($releaseInfo, $cdnBaseUrl, $permalinkBaseUrl);
    }
    
    private static function createArtifactsFromReleaseInfo(ReleaseInfo $releaseInfo, string $cdnBaseUrl, string $permalinkBaseUrl): array
    {
        $artifacts = [];
        foreach ($releaseInfo->getVariants() as $variant) {
            $fileName = $variant->getFileName();
            $downloadUrl = $cdnBaseUrl . $variant->getFileName();
            $permalink = $permalinkBaseUrl .  Variant::create($fileName)->getFileNameInLatestFormat();
            
            $artifacts[] = new Artifact($fileName, $downloadUrl, $permalink);
        }
        return $artifacts;
    }
    
    private static function createReleaseInfo($directory, $versionNumber, $safeVersion): ReleaseInfo
    {
        $fileNames = glob($directory . '/downloads/*.{zip,deb}', GLOB_BRACE);
        return new ReleaseInfo($versionNumber, $fileNames, $safeVersion);
    }
}

