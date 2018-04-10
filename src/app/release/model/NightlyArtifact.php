<?php
namespace app\release\model;

class NightlyArtifact
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
    
}