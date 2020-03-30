<?php
namespace app\domain;

use app\domain\doc\DocProvider;
use app\domain\util\StringUtil;
use app\Config;

class ReleaseInfo
{
    private Version $version;
    private array $artifacts;

    public function __construct(string $versionNumber, array $artifactFilenames)
    {
        $this->version = new Version($versionNumber);
        $this->artifacts = array_map(fn (string $filename) => Variant::create($versionNumber, $filename), $artifactFilenames);

        $releaseType = ReleaseType::byKey($versionNumber);
        if ((version_compare($versionNumber, 8) >= 0) || ($releaseType != null && $releaseType->isDevRelease())) {
            $this->variants[] = new VariantDocker($versionNumber);
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
        return $this->artifacts;
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
        return Config::releaseDirectory() . '/' . $versionNumber;
    }
    
    public function getVariantByProductNameAndType(string $productName, string $type): ?Variant
    {
        foreach ($this->artifacts as $artifact) {
            if ($artifact->getProductName() == $productName) {
                if ($artifact->getType() == $type) {
                    return $artifact;
                }
            }
        }
        return null;
    }

    public function findArtifactByPermalinkFile(string $permalinkFile): ?Variant
    {
        foreach ($this->artifacts as $artifact) {
            if (StringUtil::endsWith($artifact->getPermalink(), $permalinkFile)) {
                return $artifact;
            }
        }
        return null;
    }
}