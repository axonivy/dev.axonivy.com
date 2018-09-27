<?php
namespace app\release\model;

use app\release\model\doc\DocProvider;
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
        return file_exists($this->getHotFixPath());
    }
    
    public function getHotfixFileUrl(): string
    {
        $fileNames = glob($this->getHotFixPath() . '/*.zip');
        if (empty($fileNames)) {
            return '';
        }
        $fileName = basename($fileNames[0]);
        
        return '/releases/ivy/' . $this->version->getVersionNumber() . '/hotfix/' . $fileName;
    }
    
    private function getHotFixPath(): string
    {
        return $this->getPath() . '/hotfix';
    }
    
    public function getPath(): string
    {
        $versionNumber = $this->getVersion()->getBugfixVersion();
        return IVY_RELEASE_DIRECTORY . '/' . $versionNumber;
    }
    
    public function getPathOrLatestPath()
    {
        $folder = IVY_RELEASE_DIRECTORY . '/' . $this->getVersion()->getMinorVersion() . '.latest';
        if (file_exists($folder))
        {
            return $folder;
        }
        return $this->getPath();
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
    
    private function getVariantWithMostModernArchitecture(string $productName, string $type): ?Variant
    {
        $mostModernVariant = null;
        foreach ($this->variants as $variant) {
            if ($variant->getProductName() == $productName) {
                if ($mostModernVariant == null || $variant->architectureIsMoreModern($mostModernVariant, $type)) {
                    $mostModernVariant = $variant;
                }
            }
        }
        return $mostModernVariant;
    }
    
    public function getArtifacts(): array
    {
        return Artifact::createArtifactsFromReleaseInfo($this, CDN_HOST . '/' . $this->version->getVersionNumber() . '/', PERMALINK_STABLE);
    }
    
}