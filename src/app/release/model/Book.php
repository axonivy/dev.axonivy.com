<?php
namespace app\release\model;

abstract class AbstractDocument
{
    private $name;
    
    private $rootPath;
    private $baseUrl;
    private $baseRessourceUrl;
    
    private $path;
    
    public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path)
    {
        $this->name = $name;
        $this->rootPath = $rootPath;
        $this->baseUrl = $baseUrl;
        $this->baseRessourceUrl = $baseRessourceUrl;
        $this->path = $path;
    }
    
    public function getName(): string
    {
        return $this->name;
    }
    
    public function getUrl(): string
    {
        return $this->baseUrl . '/' . $this->path;
    }
    
    public function getRessourceUrl(): string
    {
        return $this->baseRessourceUrl . '/' . $this->path;
    }
    
    public function getPath()
    {
        return $this->path;
    }

    public function exists(): bool
    {
        return file_exists($this->rootPath . '/' . $this->path);
    }
    
    protected function getBaseUrl(): string
    {
        return $this->baseUrl;
    }
    protected function getBaseRessourceUrl(): string
    {
        return $this->baseRessourceUrl;
    }
}

class Book extends AbstractDocument
{
    private $pdfFile;

    public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path, string $pdfFile)
    {
        parent::__construct($name, $rootPath, $baseUrl, $baseRessourceUrl, $path);
        $this->pdfFile = $pdfFile;
    }
    
    public function getPdfUrl()
    {
        return parent::getBaseUrl() . '/' . $this->pdfFile;
    }
    
    public function getRessourcePdfUrl()
    {
        return parent::getBaseRessourceUrl() . '/' . $this->pdfFile;
    }
    
    public function getPdfFileName()
    {
        return $this->pdfFile;
    }
}
