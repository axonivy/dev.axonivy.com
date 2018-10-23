<?php
namespace app\release\model;

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
    
    public static function createArtifacts(string $artifactsDirectory, string $cdnBaseUrl, string $permalinkBaseUrl): array
    {
        $files = glob($artifactsDirectory . DIRECTORY_SEPARATOR . '*.{zip,deb}', GLOB_BRACE);
        $releaseInfo = new ReleaseInfo('', $files, '');
        return self::createArtifactsFromReleaseInfo($releaseInfo, $cdnBaseUrl, $permalinkBaseUrl);
    }
    
    public static function createArtifactsFromReleaseInfo(ReleaseInfo $releaseInfo, string $cdnBaseUrl, string $permalinkBaseUrl): array
    {
        $artifacts = [];
        foreach ($releaseInfo->getVariants() as $variant) {
            $fileName = $variant->getFileName();
            $downloadUrl = $cdnBaseUrl . $variant->getFileName();
            $permalink = $permalinkBaseUrl .  Variant::create($fileName)->getFileNameInLatestFormat();
            
            $artifacts[] = new Artifact($fileName, $downloadUrl, $permalink);
        }
        return $artifacts;
    }
}