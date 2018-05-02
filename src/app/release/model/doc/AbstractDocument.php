<?php
namespace app\release\model\doc;

abstract class AbstractDocument
{
    private $name;
    
    private $rootPath;
    private $baseUrl;
    private $baseRessourceUrl;
    
    private $path;
    private $urlPath;
    
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
        if (!empty($this->urlPath))
        {
            return $this->baseUrl . '/' . $this->urlPath;
        }
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
    
    public function setUrlPath(string $urlPath)
    {
        $this->urlPath = $urlPath;
    }
}