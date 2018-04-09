<?php
namespace app\release\model;

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
