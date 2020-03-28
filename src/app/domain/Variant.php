<?php
namespace app\domain;

use app\domain\util\StringUtil;

class Variant
{
    public const PRODUCT_NAME_ENGINE = 'engine';
    public const PRODUCT_NAME_DESIGNER = 'designer';
    
    public const TYPE_WINDOWS = 'Windows';
    public const TYPE_LINUX = 'Linux';
    public const TYPE_DEBIAN = 'Debian';
    public const TYPE_MAC = 'MacOSX-BETA';
    public const TYPE_ALL = 'All'; // All platforms
    public const TYPE_DOCKER = 'docker'; // no download artifacts available
    
    public const ARCHITECTURE_X64 = 'x64';
    public const ARCHITECTURE_X86 = 'x86';
    
    protected $fileName;
    protected $productName;
    protected $versionNumber;
    protected $type;
    protected $architecture;
    
    protected $originaProductNamePrefix;
    protected $shortType;
    
    public static function create(string $fileName): Variant
    {
        if (StringUtil::endsWith($fileName, 'deb'))
        {
            return new VariantDeb($fileName);
        }
        else
        {
            return new Variant($fileName);
        }
    }

    private function __construct(string $fileName)
    {
        $this->fileName = $fileName; // AxonIvyDesigner6.4.0.52683_Windows_x86.zip

        $filename = pathinfo($fileName, PATHINFO_FILENAME); // AxonIvyDesigner6.4.0.52683_Windows_x86 or AxonIvyDesigner6.4.0.52683_Osgi_All_x86
        $fileNameArray = explode('_', $filename);
        $this->architecture = end($fileNameArray); // x86

        $typeParts = array_slice($fileNameArray, 1, -1); // [Windows], [Linux], [All] or [Slim, All]
        $this->type = implode(' ', $typeParts); // 'Windows', 'Linux', 'All' or 'Slim All'
        $this->shortType =  self::calculateShortType($typeParts); // '-windows', '-linux', '' or '-slim' (-all is removed)

        $productNameVersion = $fileNameArray[0]; //AxonIvyDesigner6.4.0.52683
        $productNameVersionArray = preg_split('/(?=\d)/', $productNameVersion, 2);
        $this->originaProductNamePrefix = $productNameVersionArray[0];
        $this->productName = self::calculateProductName($this->originaProductNamePrefix);
        $this->versionNumber = $productNameVersionArray[1];
    }

    private static function calculateShortType(array $typeParts) : string
    {
        $shortType = '-' . implode('-', $typeParts);
        $shortType = strtolower($shortType);
        $shortType = str_replace('-all', '', $shortType);
        return $shortType;
    }

    private static function calculateProductName(string $fullName) : string
    {
        $fullNameLower = strtolower($fullName);
        if (StringUtil::contains($fullNameLower, 'engine'))
        {
            return self::PRODUCT_NAME_ENGINE;
        }

        if (StringUtil::contains($fullNameLower, 'designer'))
        {
            return self::PRODUCT_NAME_DESIGNER;
        }

        $productName = str_replace('AxonIvy', '', $fullName);
        $productName = str_replace('XpertIvy', '', $productName);
        $productName = str_replace('Server', 'Engine', $productName);
        return $productName;
    }
    
    private function contains(string $candidate, string $search): bool {
        return StringUtil::contains($candidate, $search);
    }
    
    public function getVersion(): Version {
        return new Version($this->versionNumber);
    }
    
    public function getDownloadUrl(): string {
        $version = $this->getVersion();
        
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
        
        return CDN_HOST . "/$versionNumber/" . basename($this->fileName);
    }
    
    public function getInstallationUrl(): string
    {
        $url = $this->getDownloadUrl();
        return self::createInstallationUrl($url, $this->versionNumber, $this->productName, $this->type);    
    }

    public static function createInstallationUrl(string $url, string $version, string $product, string $type): string
    {
        return "/installation"
            . "?downloadUrl=$url"
            . "&version=$version"
            . "&product=$product"
            . "&type=$type";   
    }
    
    public function getProductName(): string
    {
        return $this->productName;
    }
    
    public function getFileName(): string
    {
        return basename($this->fileName);
    }
    
    public function getFileNameInLatestFormat(): string
    {
        return 'axonivy-'. $this->productName . $this->shortType . '.' . $this->getFileExtension();
    }
    
    public function getFileExtension()
    {
        return pathinfo($this->fileName, PATHINFO_EXTENSION);
    }
    
    public function getFileExtensionIfNecessary(): string
    {
        $ext = $this->getFileExtension();
        if (StringUtil::contains($ext, 'deb'))
        {
            return '.deb';
        }
        return '';
    }

    public function isMavenPluginCompatible(): bool
    {
        return $this->productName == self::PRODUCT_NAME_ENGINE;
    }
    
    public function getType() {
        return $this->type;
    }
    
    public function isBeta(): bool
    {
        $filename = strtolower($this->getFileName());
        return StringUtil::contains($filename, 'beta');
    }
}

class VariantDeb extends Variant
{
    
    public function __construct(string $fileName)
    {
        $this->fileName = $fileName; // AxonIvyDesigner6.4.0.52683_Windows_x86.zip or axonivy-engine-7x_7.2.0.60027.deb
        
        $filename = pathinfo($fileName, PATHINFO_FILENAME); // AxonIvyDesigner6.4.0.52683_Windows_x86 or AxonIvyDesigner6.4.0.52683_Osgi_All_x86 or axonivy-engine-7x_7.2.0.60027
        
        $fileNameArray = explode('_', $filename);
        $this->architecture = Variant::ARCHITECTURE_X64;
        $this->type = Variant::TYPE_DEBIAN;
        $this->shortType = '';
        
        $this->originaProductNamelPrefix = Variant::PRODUCT_NAME_ENGINE;
        $this->productName = Variant::PRODUCT_NAME_ENGINE;
        $this->versionNumber = end($fileNameArray);
    }
    
    public function getFileNameInLatestFormat(): string
    {
        return 'axonivy-engine.deb';
    }
    
    public function isMavenPluginCompatible(): bool
    {
        return false;
    }
}