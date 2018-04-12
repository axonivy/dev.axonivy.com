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
        $documents[] = new Document('Designer Guide', "/$versionNumber/documents/DesignerGuideHtml/index.html", "/doc/$versionNumber/DesignerGuideHtml");
        $documents[] = new Document('Engine Guide', "/$versionNumber/documents/EngineGuideHtml/index.html", "/doc/$versionNumber/EngineGuideHtml");
        $documents[] = $this->getDocumentReleaseNote();
        $documents[] = new Document('N&N Designer', "/$versionNumber/documents/doc/newAndNoteworthy/NewAndNoteworthyDesigner.html", "/doc/$versionNumber/newAndNoteworthy/NewAndNoteworthyDesigner.html");
        $documents[] = new Document('N&N Engine', "/$versionNumber/documents/doc/newAndNoteworthy/NewAndNoteworthyEngine.html", "/doc/$versionNumber/newAndNoteworthy/NewAndNoteworthyEngine.html");
        $documents[] = new Document('Known Issues', "/$versionNumber/documents/KnownIssues.txt", "/doc/$versionNumber/KnownIssues.txt");
        
        return array_filter($documents, function(Document $doc) { return $doc->exists(); });
    }
    
    private function getDocumentReleaseNote(): Document {
        $versionNumber = $this->releaseInfo->getVersion()->getBugfixVersion();
        $fileName = 'ReleaseNotes.txt';
        if ($this->releaseInfo->getVersion()->getMinorVersion() == '4.2') {
            $versionNumber = $this->releaseInfo->getVersion()->getVersionNumber();
        }
        if ($this->releaseInfo->getVersion()->getVersionNumber() == '3.9.52.8') {
            $versionNumber = '3.9.8';
        }
        if ($this->releaseInfo->getVersion()->getVersionNumber() == '3.9.52.9') {
            $versionNumber = '3.9.9';
        }
        if ($this->releaseInfo->getVersion()->getMinorVersion() == '3.9') {
            $fileName = 'ReadMe.html';
        }
        return new Document('Release Notes', "/$versionNumber/documents/$fileName", "/doc/$versionNumber/$fileName");
    }
    
    //public function getDocumentationOverviewUrl(): string
    //{
    //    $versionNumber = $this->version->getBugfixVersion();
    //    return "/doc/$versionNumber/";
    //}
    
}