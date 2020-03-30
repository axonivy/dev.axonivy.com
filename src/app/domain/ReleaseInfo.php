<?php
namespace app\domain;

use app\domain\doc\DocProvider;
use app\domain\util\StringUtil;

class ReleaseInfo
{
    private Version $version;
    private array $variants;
    
    public function __construct(string $versionNumber, array $variantNames)
    {
        $this->version = new Version($versionNumber);
        $this->variants = array_map(fn (string $name) => Variant::create($versionNumber, $name), $variantNames);
        
        if (version_compare($versionNumber, 8) >= 0)
        {
            $this->variants[] = new VariantDocker($versionNumber, 'axonivy/axonivy-engine');
        }
    }

    public function getVersion(): Version
    {
        return $this->version;
    }

    public function versionNumber(): string
    {
        return $this->version->getVersionNumber();
    }

    public function majorVersion(): string
    {
        return $this->version->getMajorVersion();
    }

    
    
    
    public function getVariants(): array
    {
        return $this->variants;
    }
    
    public function isUnsafeVersion(): bool
    {
        return file_exists($this->getPath() . '/unsafe.version');
    }
    
    public function getDocProvider(): DocProvider
    {
        return new DocProvider($this->getVersion()->getVersionNumber());
    }
    
    public function hasHotfix(): bool
    {
        return file_exists($this->getHotFixPath());
    }
    
    public function minorVersion(): string
    {
        return $this->version->getMinorVersion();
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
    
    public function getVariantByProductNameAndType(string $productName, string $type): ?Variant
    {
        foreach ($this->variants as $variant) {
            if ($variant->getProductName() == $productName) {
                if ($variant->getType() == $type) {
                    return $variant;
                }
            }
        }
        return null;
    }

    public function findArtifactByPermalinkFile(string $permalinkFile): ?Variant
    {
        foreach ($this->getVariants() as $artifact) {
            if (StringUtil::endsWith($artifact->getPermalink(), $permalinkFile)) {
                return $artifact;
            }
        }
        return null;
    }
}