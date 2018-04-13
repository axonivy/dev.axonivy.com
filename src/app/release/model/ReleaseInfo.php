<?php
namespace app\release\model;

use app\util\UserAgentDetector;

class ReleaseInfo
{
    private $version;
    private $variants;
    private $safeVersion;
    
    public function __construct(string $versionNumber, array $variantNames, ?string $safeVersion)
    {
        $this->version = new Version($versionNumber);
        $this->variants = [];
        foreach ($variantNames as $variantName) {
            $this->variants[] = new Variant($variantName);
        }
        $this->safeVersion = $safeVersion;
    }
    
    public static function sortReleaseInfosByVersionOldestFirst(array $releaseInfos)
    {
        usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
            return version_compare($r1->getVersion()->getVersionNumber(), $r2->getVersion()->getVersionNumber());
        });
        return $releaseInfos;
    }
    
    public function isUnsafeVersion(): bool
    {
        return !empty($this->safeVersion);
    }
    
    public function getSafeVersion(): ?string
    {
        return $this->safeVersion;
    }
    
    public function getVersion(): Version
    {
        return $this->version;
    }
    
    public function getVariants(): array
    {
        return $this->variants;
    }
    
    public function getDocProvider(): DocProvider
    {
        return new DocProvider($this->getVersion()->getVersionNumber());
    }
    
    public function hasHotfix(): bool
    {
        $files_in_hotfix = @scandir($this->getHotFixPath());
        if (!$files_in_hotfix) {
            return false;
        }
        //foreach ($files_in_hotfix as $file) {
        //    if ($file == 'NotReady.txt') {
        //        return false;
        //    }
        //}
        return (count($files_in_hotfix) > 2);
    }
    
    
    public function getHotfixFile(): Document
    {
        if ($this->hasHotfix()) {
            $fileNames = glob($this->getHotFixPath() . '/*.zip');
            if (!empty($fileNames)) {
                $fileNamePath = $fileNames[0];
                $fileName = basename($fileNamePath);
                $doc = new Document($fileName, $fileNamePath, '/download/' . $this->getVersion()->getBugfixVersion() . '/' . $fileName);
                
                $fileNameParts = explode('_', $fileName);
                $fileNameParts = array_slice($fileNameParts, 1);
                $doc->setShortName(implode('_', $fileNameParts));
                return $doc;
            }
        }
        return null;
    }
    
    public function getHotfixHowtoDocument(): ?Document
    {
        if ($this->hasHotfix()) {
            return new Document('How to install', $this->getHotFixPath() . '/HowTo_Hotfix_AxonIvyEngine.txt', '/download/' . $this->getVersion()->getBugfixVersion() . '/HowTo_Hotfix_AxonIvyEngine.txt');
        }
        return null;
    }
    
    private function getHotFixPath(): string
    {
        $versionNumber = $this->getVersion()->getBugfixVersion();
        return IVY_RELEASE_DIRECTORY . '/' . $versionNumber . '/hotfix';
    }
    
    
    public function hasVariantWithProductName(string $productName): bool
    {
        foreach ($this->variants as $variant) {
            if ($variant->getProductName() == $productName) {
                return true;
            }
        }
        return false;
    }
    
    public function getMostMatchingVariantForCurrentRequest(string $productName): ?Variant
    {
        $variant = null;
        if (UserAgentDetector::isOsLinux()) {
            $variant = $this->getVariantWithMostModernArchitecture($productName, Variant::TYPE_LINUX);
        }
        if (! UserAgentDetector::isOsLinux() || $variant == null) {
            $variant = $this->getVariantWithMostModernArchitecture($productName, Variant::TYPE_WINDOWS);
        }
        return $variant;
    }
    
    public function getVariantWithMostModernArchitecture(string $productName, string $type): ?Variant
    {
        $mostModernVariant = null;
        foreach ($this->variants as $variant) {
            if ($variant->getProductName() == $productName)
            {
                if ($mostModernVariant == null || $variant->architectureIsMoreModern($mostModernVariant, $type)) {
                    $mostModernVariant = $variant;
                }
            }
        }
        return $mostModernVariant;
    }
    
    public function getVariantWithArchitecture(string $productName, string $type, string $architecture): ?Variant
    {
        $mostModernVariant = null;
        foreach ($this->variants as $variant) {
            if ($variant->getProductName() == $productName && $variant->getType() == $type && $variant->getArchitecture() == $architecture)
            {
                return $variant;
            }
        }
        return null;
    }
    
    public function getVariantsWithProductName(string $productName): array
    {
        $variants = [];
        foreach ($this->variants as $variant) {
            if ($variant->getProductName() == $productName) {
                $variants[] = $variant;
            }
        }
        return $variants;
    }
    
    
    public function getNightlyArtifacts(): array
    {
        $nightlyArtifacts = [];
        foreach ($this->getVariants() as $variant) {
            $fileName = $variant->getFileName();
            $downloadUrl = CDN_HOST_NIGHTLY . '/' . $variant->getFileName();
            $permalink = '/download/nightly/' . (new Variant($fileName))->getFileNameInLatestFormat();
            
            $nightlyArtifacts[] = new Artifact($fileName, $downloadUrl, $permalink);
        }
        return $nightlyArtifacts;
    }
    
    public function getSprintArtifacts(): array
    {
        $artifacts = [];
        foreach ($this->getVariants() as $variant) {
            $fileName = $variant->getFileName();
            $downloadUrl = CDN_HOST_SPRINT . '/' . $variant->getFileName();
            $permalink = '/download/sprint-release/' . (new Variant($fileName))->getFileNameInLatestFormat();
            
            $artifacts[] = new Artifact($fileName, $downloadUrl, $permalink);
        }
        return $artifacts;
    }
}