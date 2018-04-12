<?php
namespace app\release\model;

class Document
{
    private $name;
    private $shortName;
    private $filePath;
    private $url;
    private $isBook;
    private $pdfFile;
    
    public function __construct(string $name, string $filePath, string $url, bool $isBook)
    {
        $this->name = $name;
        $this->filePath = $filePath;
        $this->url = $url;
        $this->isBook = $isBook;
    }
    
    public function isBook(): bool 
    {
        return $this->isBook;
    }
    
    public function setShortName(string $shortName)
    {
        $this->shortName = $shortName;
    }
    
    public function getShortName(): ?string
    {
        return $this->shortName;
    }
    
    public function setPdfFile(string $pdfFile)
    {
        $this->pdfFile = $pdfFile;
    }
    
    public function getPdfFile(): ?string
    {
        return $this->pdfFile;
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
