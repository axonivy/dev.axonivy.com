<?php
namespace app\release\model\doc;

class ZipDoc extends AbstractDocument
{
    private $fileName;

    public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $fileNamePattern)
    {
        parent::__construct($name, $rootPath, $baseUrl, $baseRessourceUrl, "");

        foreach (glob(parent::getRootPath() . '/' . $fileNamePattern) as $file) {
            $this->fileName = basename($file);
        }
    }

    public function getZipUrl()
    {
        return parent::getBaseUrl() . '/' . $this->fileName;
    }
    
    public function zipExists(): bool
    {  
        if (empty($this->fileName))
        {            
            return false;
        }
        return file_exists(parent::getRootPath() . '/' . $this->fileName);
    }
}
