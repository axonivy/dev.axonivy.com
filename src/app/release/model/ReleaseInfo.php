<?php
namespace app\release\model;

use app\util\UserAgentDetector;

class ReleaseInfo
{
    private $version;
    private $variants;
    
    public function __construct(string $versionNumber, array $variantNames)
    {
        $this->version = new Version($versionNumber);
        $this->variants = [];
        foreach ($variantNames as $variantName) {
            $this->variants[] = new Variant($variantName);
        }
    }
    
    public static function sortReleaseInfosByVersionLatestFirst(array $releaseInfos)
    {
        usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
            return version_compare($r2->getVersion()->getVersionNumber(), $r1->getVersion()->getVersionNumber());
        });
        return $releaseInfos;
    }
    
    public static function sortReleaseInfosByVersionOldestFirst(array $releaseInfos)
    {
        usort($releaseInfos, function (ReleaseInfo $r1, ReleaseInfo $r2) {
            return version_compare($r1->getVersion()->getVersionNumber(), $r2->getVersion()->getVersionNumber());
        });
        return $releaseInfos;
    }
    
    public function getVersion(): Version
    {
        return $this->version;
    }
    
    public function getVariants(): array
    {
        return $this->variants;
    }
    
    public function hasHotfix(): bool
    {
        $files_in_hotfix = @scandir($this->getHotFixPath());
        if (!$files_in_hotfix) {
            return false;
        }
        foreach ($files_in_hotfix as $file) {
            if ($file == 'NotReady.txt') {
                return false;
            }
        }
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
    
    public function getDocuments(?string $productName): array
    {
        $versionNumber = $this->version->getBugfixVersion();
        
        $documents = [
            $this->getDocumentReleaseNote()
        ];
        if (empty($productName) || $productName == Variant::PRODUCT_NAME_DESIGNER) {
            $documents[] = new Document('N&N Designer', "/$versionNumber/documents/doc/newAndNoteworthy/NewAndNoteworthyDesigner.html", "/doc/$versionNumber/newAndNoteworthy/NewAndNoteworthyDesigner.html");
        }
        if (empty($productName) || $productName == Variant::PRODUCT_NAME_ENGINE) {
            $documents[] = new Document('N&N Engine', "/$versionNumber/documents/doc/newAndNoteworthy/NewAndNoteworthyEngine.html", "/doc/$versionNumber/newAndNoteworthy/NewAndNoteworthyEngine.html");
        }
        $documents[] = new Document('Known Issues', "/$versionNumber/documents/KnownIssues.txt", "/doc/$versionNumber/KnownIssues.txt");
        
        $docs = [];
        foreach ($documents as $doc) {
            if ($doc->exists()) {
                $docs[] = $doc;
            }
        }
        return $docs;
    }
    
    public function getDocumentReleaseNote(): Document {
        $versionNumber = $this->version->getBugfixVersion();
        $fileName = 'ReleaseNotes.txt';
        if ($this->version->getMinorVersion() == '4.2') {
            $versionNumber = $this->version->getVersionNumber();
        }
        if ($this->version->getVersionNumber() == '3.9.52.8') {
            $versionNumber = '3.9.8';
        }
        if ($this->version->getVersionNumber() == '3.9.52.9') {
            $versionNumber = '3.9.9';
        }
        if ($this->version->getMinorVersion() == '3.9') {
            $fileName = 'ReadMe.html';
        }
        return new Document('Release Notes', "/$versionNumber/documents/$fileName", "/doc/$versionNumber/$fileName");
    }
    
    public function getDocumentationOverviewUrl(): string
    {
        $versionNumber = $this->version->getBugfixVersion();
        return "/doc/$versionNumber/";
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
            $downloadUrl = CDN_HOST_DEV_RELEASES . '/ivy/nightly/current/' . $variant->getFileName();
            $nightlyArtifacts[] = new NightlyArtifact($fileName, $downloadUrl);
        }
        return $nightlyArtifacts;
    }
}