<?php
namespace app\release\model;

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