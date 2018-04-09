<?php
namespace app\release;

use app\util\ArrayUtil;
use app\util\UserAgentDetector;

define('CDN_HOST', 'https://download.axonivy.com');
define('CDN_HOST_DEV_RELEASES', 'https://d3ao4l46dir7t.cloudfront.net');
define('IVY_RELEASE_DIRECTORY', '/home/axonivya/www/developer.axonivy.com' . DIRECTORY_SEPARATOR . 'releases' . DIRECTORY_SEPARATOR . 'ivy');
define('IVY_NIGHTLY_RELEASE_DIRECTORY', $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'dev-releases' . DIRECTORY_SEPARATOR . 'ivy' . DIRECTORY_SEPARATOR . 'nightly' . DIRECTORY_SEPARATOR . 'current');

class ReleaseInfoRepository
{
    public static function getReleaseInfos(): array
    {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'releases.json'));
    }

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
    
}

class Document
{
    private $name;
    private $shortName;
    private $filePath;
    private $url;
    
    public function __construct(string $name, string $filePath, string $url)
    {
        $this->name = $name;
        $this->filePath = $filePath;
        $this->url = $url;
    }
    
    public function setShortName(string $shortName)
    {
        $this->shortName = $shortName;
    }
    
    public function getShortName(): ?string
    {
        return $this->shortName;
    }
    
    public function exists(): bool
    {
        return file_exists(IVY_RELEASE_DIRECTORY . $this->filePath);
    }
    
    public function getName(): string
    {
        return $this->name;
    }
    
    public function getUrl(): string
    {
        return $this->url;
    }
}

class Version
{
    private $versionNumber;
    
    public static function isValidVersionNumber(string $versionNumber): bool
    {
        $number = str_replace('.' , '', $versionNumber);
        if (!is_numeric($number)) {
            return false;
        }
        return version_compare($versionNumber, '0.0.1', '>=') >= 0;
    }
    
    public function isLongTermSupportVersion(): bool
    {
        // TODO
        $v = explode('.', $this->versionNumber);
        return $v[1] == 0;
    }
    
    public function isNewestLeadingEdgeVersion(): bool
    {
        // TODO
        return true;
    }
    
    public function __construct(string $versionNumber)
    {
        $this->versionNumber = $versionNumber;
    }
    
    public function getVersionNumber(): string
    {
        return $this->versionNumber;
    }
    
    public function isEqualOrGreaterThan(string $versionNumber): bool
    {
        return version_compare($this->versionNumber, $versionNumber, '>=');
    }
    
    /**
     * e.g. 6.1.2 or 3.9.6
     *
     * @return string
     */
    public function getBugfixVersion(): string
    {
        $v = explode('.', $this->versionNumber);
        $v = array_slice($v, 0, 3);
        return implode('.', $v);
    }
    
    /**
     * e.g. 6.1 or 3.9
     *
     * @return string
     */
    public function getMinorVersion(): string
    {
        $v = explode('.', $this->versionNumber);
        $v = array_slice($v, 0, 2);
        return implode('.', $v);
    }
    
    /**
     * e.g. 6, 7
     *
     * @return string
     */
    public function getMajorVersion(): string
    {
        $v = explode('.', $this->versionNumber);
        $v = array_slice($v, 0, 1);
        return implode('.', $v);
    }
}

class Variant
{
    public const PRODUCT_NAME_ENGINE = 'Engine';
    public const PRODUCT_NAME_DESIGNER = 'Designer';
    
    public const TYPE_WINDOWS = 'Windows';
    public const TYPE_LINUX = 'Linux';
    
    private const ARCHITECTURE_X64 = 'x64';
    private const ARCHITECTURE_X86 = 'x86';
    
    private $fileName;
    private $productName;
    private $versionNumber;
    private $type;
    private $architecture;
    
    public function __construct(string $fileName)
    {
        $this->fileName = $fileName; // AxonIvyDesigner6.4.0.52683_Windows_x86.zip
        
        $filename = pathinfo($fileName, PATHINFO_FILENAME); // AxonIvyDesigner6.4.0.52683_Windows_x86 or AxonIvyDesigner6.4.0.52683_Osgi_All_x86
        
        $fileNameArray = explode('_', $filename);
        $this->architecture = end($fileNameArray); // x86
        $typeParts = array_slice($fileNameArray, 1, -1); // [Windows] or [Osgi All]
        $this->type = implode(' ', $typeParts); // Windows or Osgi All
        
        $productNameVersion = $fileNameArray[0]; //  AxonIvyDesigner6.4.0.52683
        $productNameVersionArray = preg_split('/(?=\d)/', $productNameVersion, 2);
        $this->productName = str_replace('AxonIvy', '', $productNameVersionArray[0]);
        $this->productName = str_replace('XpertIvy', '', $this->productName);
        $this->productName = str_replace('Server', 'Engine', $this->productName);
        $this->versionNumber = $productNameVersionArray[1];
    }
    
    public function architectureIsMoreModern(Variant $mostModernVariant, string $type): bool
    {
        //echo "<br/>TESTING:".$this->fileName. " vs ".$mostModernVariant->fileName;
        if ($this->contains($this->type, 'OSGi'))
        {
            if ($this->contains($this->type, "Slim"))
            {
                return false;
            }
            if ($this->contains($this->type, $type))
            {
                return true;
            }
            if ($this->contains($this->type, "All"))
            {
                return true;
            }
            return false;
        }
        else if ($this->contains($mostModernVariant->type, 'OSGi'))
        {
            return false;
        }
        else
        {
            if ($this->contains($this->type, $type))
            {
                if ($this->architecture == self::ARCHITECTURE_X64) {
                    return true;
                }
            }
            return false;
        }
    }
    
    private function contains(string $candidate, string $search): bool {
        return strpos($candidate, $search) !== false;
    }
    
    public function getVersion(): Version {
        return new Version($this->versionNumber);
    }
    
    public function getDownloadUrl(): string {
        $version = $this->getVersion();
        $prefix = CDN_HOST;
        
        $versionNumber = $version->getBugfixVersion();
        if ($version->getMinorVersion() == '4.2') {
            $versionNumber = $version->getVersionNumber();
        }
        if ($version->getVersionNumber() == '3.9.52.8') {
            $versionNumber = '3.9.8';
        }
        if ($version->getVersionNumber() == '3.9.52.9') {
            $versionNumber = '3.9.9';
        }
        
        return "$prefix/$versionNumber/" . basename($this->fileName);
    }
    
    public function getDownloadUrlViaInstallation(): string {
        $versionNumber = $this->getVersion()->getBugfixVersion();
        return "/installation/?startdownload=$versionNumber/" . basename($this->fileName);
    }
    
    public function getArchitecture(): string{
        return $this->architecture;
    }
    
    public function getProductName(): string
    {
        return $this->productName;
    }
    
    public function getType(): string
    {
        return $this->type;
    }
    
    public function getFileName(): string
    {
        return basename($this->fileName);
    }
    
}