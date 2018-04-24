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
     * @return AbstractDocument|NULL
     */
    public function findDocumentByPathName(string $pathName): ?AbstractDocument
    {
        return $this->findDocumentByFilter(function (AbstractDocument $doc) use ($pathName) {
            return $doc->getPath() == $pathName;
        });
    }
    
    public function findDocumentByPdfName(string $pdfFileName): ?AbstractDocument
    {
        return $this->findDocumentByFilter(function (AbstractDocument $doc) use ($pdfFileName) {
            return $doc->getPdfFileName() == $pdfFileName;
        });
    }
    
    private function findDocumentByFilter(callable $function): ?AbstractDocument
    {
        $docs = $this->findAllDocuments();
        $docs = array_filter($docs, $function);
        return array_shift(array_values($docs));
    }
    
    public function getBooks(): array
    {
        return array_filter(self::findAllDocuments(), function (AbstractDocument $doc) { return $doc instanceof Book; });
    }
    
    public function getReleaseDocuments(): array
    {
        return array_filter(self::findAllDocuments(), function (AbstractDocument $doc) { return $doc instanceof ReleaseDocument; });
    }
    
    private function findAllDocuments(): array
    {
        $documents = [
            self::createBook('Designer Guide', 'DesignerGuideHtml', 'DesignerGuide.pdf'),
            self::createBook('Engine Guide', 'EngineGuideHtml', 'EngineGuide.pdf'),
            self::createBook('Portal Kit', 'PortalKitHtml', 'PortalKitDocumentation.pdf'),
            self::createBook('Portal Connector', 'PortalConnectorHtml', 'PortalConnectorDocumentation.pdf'),
            
            self::createReleaseDocument('N&N', 'newAndNoteworthy/NewAndNoteworthy.html'),
            self::createReleaseDocument('N&N Designer', 'newAndNoteworthy/NewAndNoteworthyDesigner.html'),
            self::createReleaseDocument('N&N Engine', 'newAndNoteworthy/NewAndNoteworthyEngine.html'),
            self::createReleaseDocument('Migration Notes', 'MigrationNotes.html'),
            self::createReleaseDocument('ReadMe Designer', 'ReadMe.html'),
            self::createReleaseDocument('ReadMe Engine', 'ReadMeEngine.html')
        ];
        return array_filter($documents, function(AbstractDocument $doc) { return $doc->exists(); });
    }
    
    private function createBook($name, $path, $pdfFile): Book
    {
        $rootPath = $this->createRootPath();
        $baseUrl = $this->createBaseUrl();
        $baseRessourceUrl = $this->createBaseRessourceUrl();
        return new Book($name, $rootPath, $baseUrl, $baseRessourceUrl, $path, $pdfFile);
    }
    
    private function createReleaseDocument($name, $path): ReleaseDocument
    {
        $rootPath = $this->createRootPath();
        $baseUrl = $this->createBaseUrl();
        $baseRessourceUrl = $this->createBaseRessourceUrl();
        return new ReleaseDocument($name, $rootPath, $baseUrl, $baseRessourceUrl, $path);
    }
    
    private function createReleaseNotes(): ReleaseDocument
    {
        $version = new Version($this->versionNumber);
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
        // TODO FIX
        //return new ReleaseDocument('Release Notes', "/$versionNumber/documents/$fileName", "/doc/$versionNumber/$fileName", false);
        return $this->createReleaseDocument('Release Notes', 'ReleaseNotes.txt');
    }
    
    private function createRootPath(): string
    {
        return StringUtil::createPath([IVY_RELEASE_DIRECTORY, $this->versionNumber, 'documents']);
    }
    
    private function createBaseUrl(): string
    {
        return '/doc/' . $this->versionNumber;
    }
    
    private function createBaseRessourceUrl(): string
    {
        return '/releases/ivy/' . $this->versionNumber . '/documents';
    }
    

    
    
    
    
    
    
    
    public function getReleaseNotes(): ReleaseDocument
    {
        return self::createReleaseNotes($this->versionNumber);
    }
    
    //$documents[] = self::createExternalBook('Public API', $versionNumber, 'PublicAPI');
    
    
    
    
    
    
}