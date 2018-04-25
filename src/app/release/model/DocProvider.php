<?php 

namespace app\release\model;

use app\util\StringUtil;
use app\util\ArrayUtil;

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
            if ($doc instanceof Book) {
                return $doc->getPdfFileName() == $pdfFileName;
            }
            return false;
        });
    }
    
    public function findExternalBookByPathName(string $pathName): ?ExternalBook
    {
        return $this->findDocumentByFilter(function (AbstractDocument $doc) use ($pathName) {
            if ($doc instanceof ExternalBook) {
                return $doc->getPath() == $pathName;
            }
            return false;
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
    
    public function getExternalBooks(): array
    {
        return array_filter(self::findAllDocuments(), function (AbstractDocument $doc) { return $doc instanceof ExternalBook; });
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
            
            self::createExternalBook('Public API', 'PublicAPI'),
            
            self::createReleaseNotes(),
            self::createReleaseDocument('N&N', 'NewAndNoteworthy.html'),
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
    
    private function createExternalBook($name, $path): ExternalBook
    {
        $rootPath = $this->createRootPath();
        $baseUrl = $this->createBaseUrl();
        $baseRessourceUrl = $this->createBaseRessourceUrl();
        return new ExternalBook($name, $rootPath, $baseUrl, $baseRessourceUrl, $path);
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
    
    /**
     * returns e.g. 7.1.latest
     * @return string
     */
    public static function findLatestMinor(): string
    {
        $versionNumbers = [];
        
        $directories = array_filter(glob(IVY_RELEASE_DIRECTORY . DIRECTORY_SEPARATOR . '*'), 'is_dir');
        foreach ($directories as $directory) {
            $versionNumber = basename($directory);
            
            $latest = '.latest';
            
            // drop e.g. nightly or sprint
            if (!StringUtil::endsWith($versionNumber, $latest)) {
                continue;
            }
            
            $versionNumbers[] = substr($versionNumber, 0, -strlen($latest));
        }
        
        usort($versionNumbers, function ($versionNumber1, $versionNumber2) {
            return version_compare($versionNumber1, $versionNumber2);
        });
        
        $minorVersion = ArrayUtil::getLastElementOrNull($versionNumbers);
        
        if (empty($minorVersion)) {
            return '';
        }
        return $minorVersion . $latest;
    }
       
    
    
    
    
    
    
    
    
    
    
    
    
    
    public function getReleaseNotes(): ReleaseDocument
    {
        return self::createReleaseNotes($this->versionNumber);
    }
    
    
    
    
    
    
    
}