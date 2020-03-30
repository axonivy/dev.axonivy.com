<?php
namespace app\domain;

use app\domain\util\StringUtil;
use app\Config;

class Artifact
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
    
    protected string $folderName; // this is the folderName where the artifact is in (version number)
    
    protected $fileName;
    protected $productName;
    protected $versionNumber;
    protected $type;
    protected $architecture;
    
    protected $originaProductNamePrefix;
    protected $shortType;

    public static function create(string $folderName, string $fileName): Artifact
    {
        if (StringUtil::endsWith($fileName, 'deb')) {
            return new DebianArtifact($folderName, $fileName);
        } else {
            return new Artifact($folderName, $fileName);
        }
    }

    private function __construct(string $folderName, string $fileName)
    {
        $this->folderName = $folderName;
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

    public function getVersion(): Version
    {
        return new Version($this->versionNumber);
    }

    public function getDownloadUrl(): string
    {
        return Config::CDN_URL . "/" . $this->folderName . "/" . basename($this->fileName);
    }

    public function getInstallationUrl(): string
    {
        $url = $this->getDownloadUrl();
        return "/installation"
            . "?downloadUrl=$url"
            . "&version=$this->versionNumber"
            . "&product=$this->productName"
            . "&type=$this->type";
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

    public function isMavenPluginCompatible(): bool
    {
        return $this->productName == self::PRODUCT_NAME_ENGINE;
    }

    public function getType()
    {
        return $this->type;
    }
    
    public function isBeta(): bool
    {
        $filename = strtolower($this->getFileName());
        return StringUtil::contains($filename, 'beta');
    }

    public function getPermalink(): string
    {
        // TODO We should not access $_SERVER
        $basePermalink = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
        return $basePermalink . '/permalink/' . $this->folderName . '/' . $this->getFileNameInLatestFormat();
    }
}

class DebianArtifact extends Artifact
{
    
    public function __construct(string $folderName, string $fileName)
    {
        $this->folderName = $folderName;
        $this->fileName = $fileName; // AxonIvyDesigner6.4.0.52683_Windows_x86.zip or axonivy-engine-7x_7.2.0.60027.deb
        
        $filename = pathinfo($fileName, PATHINFO_FILENAME); // AxonIvyDesigner6.4.0.52683_Windows_x86 or AxonIvyDesigner6.4.0.52683_Osgi_All_x86 or axonivy-engine-7x_7.2.0.60027
        
        $fileNameArray = explode('_', $filename);
        $this->architecture = Artifact::ARCHITECTURE_X64;
        $this->type = Artifact::TYPE_DEBIAN;
        $this->shortType = '';
        
        $this->originaProductNamelPrefix = Artifact::PRODUCT_NAME_ENGINE;
        $this->productName = Artifact::PRODUCT_NAME_ENGINE;
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

class DockerArtifact extends Artifact
{
    public function __construct(string $versionNumber)
    {
        $this->folderName = $versionNumber;
        $this->fileName = Config::DOCKER_IMAGE_ENGINE . ":$versionNumber";
        
        $this->architecture = Artifact::ARCHITECTURE_X64;
        $this->type = Artifact::TYPE_DOCKER;
        $this->shortType = '';
        
        $this->originaProductNamelPrefix = Artifact::PRODUCT_NAME_ENGINE;
        $this->productName = Artifact::PRODUCT_NAME_ENGINE;
        $this->versionNumber = $versionNumber;
    }

    public function getPermalink(): string
    {
        return '';
    }
    
    public function getFileNameInLatestFormat(): string
    {
        return '';
    }
    
    public function getFileExtension(): string
    {
        return '';
    }
    
    public function isMavenPluginCompatible(): bool
    {
        return false;
    }
    
    public function getDownloadUrl(): string
    {
        return Config::DOCKER_HUB_IMAGE_URL;
    }
    
    public function getFileName(): string
    {
        return $this->fileName;
    }
}