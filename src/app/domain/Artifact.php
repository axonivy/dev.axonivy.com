<?php
namespace app\domain;

class Artifact
{
    private $fileName;
    private $downloadUrl;
    private $permaLink;
    
    function __construct($fileName, $downloadUrl, $permalink)
    {
        $this->fileName = $fileName;
        $this->downloadUrl = $downloadUrl;
        $this->permaLink = $permalink;
    }
    
    function getFileName() {
        return $this->fileName;
    }
    
    function getDownloadUrl() {
        return $this->downloadUrl;
    }
    
    function getPermalink() {
        return $this->permaLink;
    }
}