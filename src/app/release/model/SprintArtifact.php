<?php
namespace app\release\model;

class SprintArtifact
{
    private $fileName;
    private $downloadUrl;
    
    function __construct($fileName, $downloadUrl)
    {
        $this->fileName = $fileName;
        $this->downloadUrl = $downloadUrl;
    }
    
    function getFileName() {
        return $this->fileName;
    }
    
    function getDownloadUrl() {
        return $this->downloadUrl;
    }
 
    function getPermalink() {
        $variant = new Variant($this->fileName);
        return BASE_URL . '/download/sprint-release/' . $variant->getFileNameInLatestFormat();
    }
    
}