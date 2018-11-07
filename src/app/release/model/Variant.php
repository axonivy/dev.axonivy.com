<?php
namespace app\release\model;

use app\util\StringUtil;

class Variant
{
    public const PRODUCT_NAME_ENGINE = 'Engine';
    public const PRODUCT_NAME_DESIGNER = 'Designer';
    
    public const TYPE_WINDOWS = 'Windows';
    public const TYPE_LINUX = 'Linux';
    public const TYPE_DEBIAN = 'Deb';
    
    public const ARCHITECTURE_X64 = 'x64';
    public const ARCHITECTURE_X86 = 'x86';
    
    protected $fileName;
    protected $productName;
    protected $versionNumber;
    protected $type;
    protected $architecture;
    
    protected $originaProductNamelPrefix;
    protected $originalTypeString;
    
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

        $typeParts = array_slice($fileNameArray, 1, -1); // [Windows] or [Osgi All]
        $this->type = implode(' ', $typeParts); // Windows or Osgi All
        $this->originalTypeString = implode('_', $typeParts);

        $productNameVersion = $fileNameArray[0]; //AxonIvyDesigner6.4.0.52683
        $productNameVersionArray = preg_split('/(?=\d)/', $productNameVersion, 2);
        $this->originaProductNamelPrefix = $productNameVersionArray[0];
        $this->productName = str_replace('AxonIvy', '', $this->originaProductNamelPrefix);
        $this->productName = str_replace('XpertIvy', '', $this->productName);
        $this->productName = str_replace('Server', 'Engine', $this->productName);
        $this->versionNumber = $productNameVersionArray[1];
    }
    
    public function architectureIsMoreModern(Variant $mostModernVariant, string $type): bool
    {
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
        return '/installation?downloadUrl=' . $this->getDownloadUrl();    
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
        return $this->originaProductNamelPrefix . '-latest_' . $this->originalTypeString . '_' . $this->architecture . '.' . $this->getFileExtension();
    }
    
    public function getFileExtension()
    {
        return pathinfo($this->fileName, PATHINFO_EXTENSION);
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
        $this->originalTypeString = Variant::TYPE_DEBIAN;
        
        $this->originaProductNamelPrefix = Variant::PRODUCT_NAME_ENGINE;
        $this->productName = Variant::PRODUCT_NAME_ENGINE;
        $this->versionNumber = end($fileNameArray);
    }
    
    public function getFileNameInLatestFormat(): string
    {
        return 'axonivy-engine-latest.deb';
    }
}