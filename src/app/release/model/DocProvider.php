<?php 

namespace app\release\model;

class DocProvider
{
    
    private $releaseInfo;
    
    public function __construct(ReleaseInfo $releaseInfo)
    {
        $this->releaseInfo = $releaseInfo;    
    }
    
    public function getDocuments(): array
    {
        $versionNumber = $this->releaseInfo->getVersion()->getBugfixVersion();
        
        $docDir = IVY_RELEASE_DIRECTORY . '/' . $versionNumber . '';
        
        $documents = [];
        
        $documents[] = self::createBook('Designer Guide', $versionNumber, 'DesignerGuideHtml', 'DesignerGuide.pdf');
        $documents[] = self::createBook('Engine Guide', $versionNumber, 'EngineGuideHtml', 'EngineGuide.pdf');
        $documents[] = self::createBook('Portal Kit', $versionNumber, 'PortalKitHtml', 'PortalKit.pdf');
        $documents[] = self::createBook('Portal Connector', $versionNumber, 'PortalConnectorHtml', 'PortalConnector.pdf');
        $documents[] = self::createBook('Public API', $versionNumber, 'PublicAPI', '');
        
        $documents[] = self::createReleaseNotes($this->releaseInfo->getVersion());
  
        $documents[] = self::createDocument('N&N Designer', $versionNumber, 'newAndNoteworthy/NewAndNoteworthyDesigner.html');
        $documents[] = self::createDocument('N&N Engine', $versionNumber, 'newAndNoteworthy/NewAndNoteworthyEngine.html');
        $documents[] = self::createDocument('Known Issues', $versionNumber, 'newAndNoteworthy/KnownIssues.txt');
        
        $documents[] = self::createDocument('ReadMe Designer', $versionNumber, 'ReadMe.html');
        $documents[] = self::createDocument('ReadMe Engine', $versionNumber, 'ReadMeEngine.html');
        
        return array_filter($documents, function(Document $doc) { return $doc->exists(); });
    }
    
    private static function createBook($bookName, $versionNumber, $dirName, $pdfFile): Document
    {
        $doc = new Document($bookName, "/$versionNumber/documents/$dirName/index.html", "/doc/$versionNumber/$dirName", true);
        $doc->setPdfFile($pdfFile);
        return $doc;
    }
    
    private static function createDocument($docName, $versionNumber, $filePath): Document
    {
        return new Document($docName, "/$versionNumber/documents/$filePath", "/doc/$versionNumber/$filePath", false);
    }
    
    private static function createReleaseNotes(Version $version): Document
    {
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