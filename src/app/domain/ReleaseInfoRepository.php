<?php
namespace app\domain;

use app\domain\util\ArrayUtil;
use app\domain\util\StringUtil;

class ReleaseInfoRepository
{
    public static function getLeadingEdge(): ?ReleaseInfo
    {
        $leVersion = LE_VERSION;
        if (empty($leVersion)) {
            return null;
        }
        
        $releaseInfos = self::getAvailableReleaseInfos();
        $releaseInfos = array_filter($releaseInfos, function(ReleaseInfo $releaseInfo) {
            $v = $releaseInfo->getVersion()->getVersionNumber();
            return StringUtil::startsWith($v, LE_VERSION);
        });
        return ArrayUtil::getLastElementOrNull($releaseInfos);
    }
    
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
    
    public static function getLongTermSupportVersions(): array
    {
        $releaseInfos = self::getAvailableReleaseInfos();
        $lts = [];
        foreach (LTS_VERSIONS as $ltsVersion) {
            $infos = array_filter($releaseInfos, function(ReleaseInfo $releaseInfo) use ($ltsVersion) {
                $v = $releaseInfo->getVersion()->getVersionNumber();
                return StringUtil::startsWith($v, $ltsVersion);
            });
            $lts[] = ArrayUtil::getLastElementOrNull($infos);
        }
        return array_reverse(array_filter($lts));
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
            $releaseReadyFile = $directory . DIRECTORY_SEPARATOR . 'release.ready';
            if (!file_exists($releaseReadyFile)) {
                continue;
            }
            
            $versionNumber = basename($directory);
            // drop e.g. nightly or sprint
            if (!Version::isValidVersionNumber($versionNumber)) {
                continue;
            }
            
            $releaseInfos[] = self::createReleaseInfo($directory, $versionNumber);
        }
        $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionOldestFirst($releaseInfos);
        return $releaseInfos;
    }
    
    /**
     * 8.0
     * 8.0.3
     */
    public static function isReleased($version): bool
    {
        foreach (self::getAvailableReleaseInfos() as $releaseInfo)
        {
            $versionNumber = $releaseInfo->getVersion()->getVersionNumber();
            if (StringUtil::startsWith($versionNumber, $version))
            {
                return true;
            }
        }
        return false;
    }

    /**
     * e.g: 7.0.3, 8.0.1, latest, sprint, nightly, dev
     * - 8.0 -> newest 8.0.x
     * - 8 -> newest 8.x
     */
    public static function getArtifacts(string $version): array
    {
        $versionBestMatch = self::getBestMatchingVersion($version);
        
        $artifactsDirectory = IVY_RELEASE_DIRECTORY . '/' . $versionBestMatch;
        $cdnBaseUrl = CDN_HOST . '/' . $versionBestMatch . '/';
        $permalinkBaseUrl = PERMALINK_BASE_URL . $versionBestMatch . '/';
        
        $releaseInfo = self::createReleaseInfo($artifactsDirectory, '', '');
        
        return self::createArtifactsFromReleaseInfo($releaseInfo, $cdnBaseUrl, $permalinkBaseUrl);
    }

    public static function getBestMatchingMinorVersion(string $version): string {
        if (StringUtil::isFirstCharacterNumeric($version)) {
            $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionNewestFirst(self::getAvailableReleaseInfos());
            foreach ($releaseInfos as $info) {
                if ($info->getVersion()->isMinor()) {
                    $v = $info->getVersion()->getVersionNumber();
                    if (StringUtil::startsWith($v, $version))
                    {
                        return $info->getVersion()->getVersionNumber();
                    }
                }                
            }
        }
        return $version;
    }
    
    private static function getBestMatchingVersion(string $version): string {
        if (StringUtil::isFirstCharacterNumeric($version)) {
            $releaseInfos = ReleaseInfo::sortReleaseInfosByVersionNewestFirst(self::getAvailableReleaseInfos());
            foreach ($releaseInfos as $info) {
                $v = $info->getVersion()->getVersionNumber();
                if (StringUtil::startsWith($v, $version))
                {
                    return $info->getVersion()->getVersionNumber();
                }
            }
        }
        return $version;
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
    
    private static function createReleaseInfo($directory, $versionNumber): ReleaseInfo
    {
        $fileNames = glob($directory . '/downloads/*.{zip,deb}', GLOB_BRACE);
        return new ReleaseInfo($versionNumber, $fileNames);
    }
}

