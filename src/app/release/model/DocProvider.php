<?php 

namespace app\release\model;

use app\util\StringUtil;

class DocProvider
{
    /**
     * For example:
     * <li> latest
     * <li> 7.0.latest
     * <li> 7.0.0
     * @var $versionNumber
     */
    private $versionNumber;
    
    public function __construct(string $versionNumber)
    {
        $this->versionNumber = $versionNumber;    
    }
    
    public function exists(): bool
    {
        return file_exists($this->getDocDir());
    }
    
    private function getDocDir()
    {
        return IVY_RELEASE_DIRECTORY . DIRECTORY_SEPARATOR . $this->versionNumber;
    }
    
    /**
     * For example:
     * <li> DesignerGuideHtml
     * <li> EngineGuideHtml
     * @param string $name
     * @return Document|NULL
     */
    public function findDocumentByPathName(string $pathName): ?AbstractDocument
    {
        $docs = $this->findAllDocuments();
        $docs = array_filter($docs, function (AbstractDocument $doc) use ($pathName) {
            return $doc->getPath() == $pathName;
        });
        return array_shift(array_values($docs));
    }
    
    public function findDocumentByPdfName(string $pdfFileName): ?AbstractDocument
    {
        $docs = $this->findAllDocuments();
        $docs = array_filter($docs, function (AbstractDocument $doc) use ($pdfFileName) {
            return $doc->getPdfFileName() == $pdfFileName;
        });
        return array_shift(array_values($docs));
    }
    
    private function findAllDocuments(): array
    {
        $documents = [
            self::createBook('Designer Guide', 'DesignerGuideHtml', 'DesignerGuide.pdf'),
            self::createBook('Engine Guide', 'EngineGuideHtml', 'EngineGuide.pdf'),
            self::createBook('Portal Kit', 'PortalKitHtml', 'PortalKitDocumentation.pdf'),
            self::createBook('Portal Connector', 'PortalConnectorHtml', 'PortalConnectorDocumentation.pdf')
        ];
        return array_filter($documents, function(AbstractDocument $doc) { return $doc->exists(); });
    }
    
    private function createBook($name, $path, $pdfFile): Book
    {
        $rootPath = StringUtil::createPath([IVY_RELEASE_DIRECTORY, $this->versionNumber, 'documents']);
        $baseUrl = '/doc/' . $this->versionNumber;
        $baseRessourceUrl = '/releases/ivy/' . $this->versionNumber . '/documents';
        return new Book($name, $rootPath, $baseUrl, $baseRessourceUrl, $path, $pdfFile);
    }
    
    public function getBooks(): array
    {
        return array_filter(self::findAllDocuments(), function (AbstractDocument $doc) { return $doc instanceof Book; });
    }
    
    
    
    
    
    
    
    
    
    public function getReleaseNotes(): Document
    {
        return self::createReleaseNotes($this->versionNumber);
    }
    
    
    
    public function getDocuments(): array
    {
        return array_filter(self::getAllDocuments(), function (Document $doc) { return !$doc->isBook(); });
    }
    
    
    
    
    
    //$documents[] = self::createExternalBook('Public API', $versionNumber, 'PublicAPI');
    //$documents[] = self::createReleaseNotes($versionNumber);
    //$documents[] = self::createDocument('N&N', $versionNumber, 'newAndNoteworthy/NewAndNoteworthy.html');
    //$documents[] = self::createDocument('N&N Designer', $versionNumber, 'newAndNoteworthy/NewAndNoteworthyDesigner.html');
    //$documents[] = self::createDocument('N&N Engine', $versionNumber, 'newAndNoteworthy/NewAndNoteworthyEngine.html');
    //$documents[] = self::createDocument('Migration Notes', $versionNumber, 'MigrationNotes.html');
    //$documents[] = self::createDocument('ReadMe Designer', $versionNumber, 'ReadMe.html');
    //$documents[] = self::createDocument('ReadMe Engine', $versionNumber, 'ReadMeEngine.html');
    
    
    
//     private static function createDocument($docName, $versionNumber, $filePath): Document
//     {
//         $doc = new Document($docName, "/$versionNumber/documents/$filePath", "/doc/$versionNumber/$filePath", false);
//         $doc->setPublicUrl('/releases/ivy/'.$versionNumber.'/documents/' . $filePath);
//         return $doc;
//     }
    
//     private static function createReleaseNotes(string $versionNumber): Document
//     {
//         $version = new Version($versionNumber);
//         $versionNumber = $version->getBugfixVersion();
//         $fileName = 'ReleaseNotes.txt';
//         if ($version->getMinorVersion() == '4.2') {
//             $versionNumber = $version->getVersionNumber();
//         }
//         if ($version->getVersionNumber() == '3.9.52.8') {
//             $versionNumber = '3.9.8';
//         }
//         if ($version->getVersionNumber() == '3.9.52.9') {
//             $versionNumber = '3.9.9';
//         }
//         if ($version->getMinorVersion() == '3.9') {
//             $fileName = 'ReadMe.html';
//         }
//         return new Document('Release Notes', "/$versionNumber/documents/$fileName", "/doc/$versionNumber/$fileName", false);
//     }
    
    
}