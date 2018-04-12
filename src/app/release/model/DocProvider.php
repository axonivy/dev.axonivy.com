<?php 

namespace app\release\model;

class DocProvider
{
    // 7.0.0
    // latest
    // 7.0.latest
    private $versionNumber;
    
    public function __construct(string $versionNumber)
    {
        $this->versionNumber = $versionNumber;    
    }
    
    public function exists(): bool
    {
        return file_exists($this->getDocDir());
    }
    
    public function getReleaseNotes(): Document
    {
        return self::createReleaseNotes($this->versionNumber);
    }
    
    public function getBooks(): array
    {
        return array_filter(self::getAllDocuments(), function (Document $doc) { return $doc->isBook(); });
    }
    
    public function getDocuments(): array
    {
        return array_filter(self::getAllDocuments(), function (Document $doc) { return !$doc->isBook(); });
    }
    
    private function getDocDir()
    {
        return IVY_RELEASE_DIRECTORY . '/' . $versionNumber;
    }
    
    private function getAllDocuments(): array
    {
        $versionNumber = $this->versionNumber;
        
        $docDir = $this->getDocDir();
        
        $documents = [];
        
        $documents[] = self::createBook('Designer Guide', $versionNumber, 'DesignerGuideHtml', 'DesignerGuide.pdf');
        $documents[] = self::createBook('Engine Guide', $versionNumber, 'EngineGuideHtml', 'EngineGuide.pdf');
        $documents[] = self::createBook('Portal Kit', $versionNumber, 'PortalKitHtml', 'PortalKit.pdf');
        $documents[] = self::createBook('Portal Connector', $versionNumber, 'PortalConnectorHtml', 'PortalConnector.pdf');
        $documents[] = self::createBook('Public API', $versionNumber, 'PublicAPI', '');
        
        $documents[] = self::createReleaseNotes($versionNumber);
  
        $documents[] = self::createDocument('N&N Designer', $versionNumber, 'newAndNoteworthy/NewAndNoteworthyDesigner.html');
        $documents[] = self::createDocument('N&N Engine', $versionNumber, 'newAndNoteworthy/NewAndNoteworthyEngine.html');
        $documents[] = self::createDocument('Migration Notes', $versionNumber, 'MigrationNotes.html');
        
        $documents[] = self::createDocument('ReadMe Designer', $versionNumber, 'ReadMe.html');
        $documents[] = self::createDocument('ReadMe Engine', $versionNumber, 'ReadMeEngine.html');
        
        return array_filter($documents, function(Document $doc) { return $doc->exists(); });
    }
    
    private static function createBook($bookName, $versionNumber, $dirName, $pdfFile): Document
    {
        $doc = new Document($bookName, "/$versionNumber/documents/$dirName/index.html", "/doc/$versionNumber/$dirName/", true);
        $doc->setPdfUrl("/doc/$versionNumber/$pdfFile");
        return $doc;
    }
    
    private static function createDocument($docName, $versionNumber, $filePath): Document
    {
        return new Document($docName, "/$versionNumber/documents/$filePath", "/doc/$versionNumber/$filePath", false);
    }
    
    private static function createReleaseNotes(string $versionNumber): Document
    {
        $version = new Version($versionNumber);
        $versionNumber = $version->getBugfixVersion();
        $fileName = 'ReleaseNotes.txt';
        if ($version->getMinorVersion() == '4.2') {
            $versionNumber = $version->getVersionNumber();
        }
        if ($version->getVersionNumber() == '3.9.52.8') {
            $versionNumber = '3.9.8';
        }
        if ($version->getVersionNumber() == '3.9.52.9') {
            $versionNumber = '3.9.9';
        }
        if ($version->getMinorVersion() == '3.9') {
            $fileName = 'ReadMe.html';
        }
        return new Document('Release Notes', "/$versionNumber/documents/$fileName", "/doc/$versionNumber/$fileName", false);
    }
    
    //public function getDocumentationOverviewUrl(): string
    //{
    //    $versionNumber = $this->version->getBugfixVersion();
    //    return "/doc/$versionNumber/";
    //}
    
}