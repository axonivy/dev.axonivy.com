<?php
namespace app\release\model;

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
