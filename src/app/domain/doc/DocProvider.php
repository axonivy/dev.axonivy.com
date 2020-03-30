<?php 
namespace app\domain\doc;

use app\domain\util\StringUtil;
use app\domain\Version;
use app\Config;

class DocProvider
{
    /**
     * For example:
     * <li> sprint
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
    
    public function hasDocuments(): bool
    {
        return !empty(self::findAllDocuments());
    }
    
    private function getDocDir()
    {
        return Config::releaseDirectory() . DIRECTORY_SEPARATOR . $this->versionNumber;
    }
    
    public function findDocumentByNiceUrlPath(string $niceUrlPath): ?AbstractDocument
    {
        return $this->findDocumentByFilter(function (AbstractDocument $doc) use ($niceUrlPath) {
            if ($doc instanceof ReleaseDocument) {
                return $doc->getNiceUrlPath() == $niceUrlPath;
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
    
    public function getExistingBooks(): array
    {
      $existingBooks = [];
      foreach ($this->getBooks() as $book) {
          if ($book->pdfExists()) {
            $existingBooks[] = $book;
          }
      }
      return $existingBooks;
    }
    
    public function getImportantBooks(): array
    {
        return array_filter(self::getBooks(), fn (Book $book) => !StringUtil::startsWith(strtolower($book->getName()), "portal"));
    }
    
    public function getNotImportantBooks(): array
    {
        return array_filter(self::getBooks(), function (Book $book) { return StringUtil::startsWith(strtolower($book->getName()), "portal"); });
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
            self::createBook('Designer Guide', 'DesignerGuideHtml', 'DesignerGuide.pdf'), // legacy engine guide prior to 8.0
            self::createBook('Designer Guide', 'designer-guide', ''), // new guide since 8.0

            self::getServerGuide(),
            self::createBook('Engine Guide', 'EngineGuideHtml', 'EngineGuide.pdf'), // legacy engine guide prior to 7.4
            self::createBook('Engine Guide', 'engine-guide', ''), // new engine guide since 7.4
            
            self::createBook('Portal Kit', 'PortalKitHtml', 'PortalKitDocumentation.pdf'),  // legacy
            self::createBook('Portal Connector', 'PortalConnectorHtml', 'PortalConnectorDocumentation.pdf'), // legacy
            
            self::createExternalBook('Public API', 'PublicAPI'),  // legacy public api url
            self::createExternalBook('Public API', 'public-api'),  // new url since 8.0
            
            self::getNewAndNoteworthy(), // since 9.1 not available
            self::getReleaseNotes(), // since 9.1 part of product documentation
            self::createReleaseDocument('Migration Notes', 'MigrationNotes.html', 'migration-notes'), // since 9.1 part of product documentation
            self::createReleaseDocument('ReadMe', 'ReadMe.html', 'readme'), // since 9.1 not available
            self::createReleaseDocument('ReadMe Engine', 'ReadMeEngine.html', 'readme-engine'), // legacy
            self::createReleaseDocument('ReadMe Server', 'ReadMeServer.html', 'readme-server')  // legacy
        ];
        return array_filter($documents, function(AbstractDocument $doc) { return $doc->exists(); });
    }

    private function createBook($name, $path, $pdfFile): Book
    {
        $rootPath = $this->createRootPath();
        $baseUrl = $this->createBaseUrl();
        $baseRessourceUrl = $this->createBaseRessourceUrl();
        return new Book($name, $rootPath, $baseUrl, $baseRessourceUrl, $path . '/', $pdfFile);
    }
    
    private function createExternalBook($name, $path): ExternalBook
    {
        $rootPath = $this->createRootPath();
        $baseUrl = $this->createBaseUrl();
        $baseRessourceUrl = $this->createBaseRessourceUrl();
        return new ExternalBook($name, $rootPath, $baseUrl, $baseRessourceUrl, $path . '/');
    }
    
    private function createReleaseDocument($name, $path, $niceUrlPath): ReleaseDocument
    {
        $rootPath = $this->createRootPath();
        $baseUrl = $this->createBaseUrl();
        $baseRessourceUrl = $this->createBaseRessourceUrl();
        return new ReleaseDocument($name, $rootPath, $baseUrl, $baseRessourceUrl, $path, $niceUrlPath);
    }
    
    private function createRootPath(): string
    {
        return Config::releaseDirectory() . '/' . $this->versionNumber . '/documents';
    }
    
    private function createBaseUrl(): string
    {
        return '/doc/' . $this->versionNumber;
    }
    
    private function createBaseRessourceUrl(): string
    {
        return '/releases/ivy/' . $this->versionNumber . '/documents';
    }
    
    private function getReleaseNotes(): ReleaseDocument
    {
        $version = new Version($this->versionNumber);
        $fileName = 'ReleaseNotes.txt';
        if ($version->getMinorVersion() == '3.9') {
            $fileName = 'ReadMe.html';
        }
        return $this->createReleaseDocument('Release Notes', $fileName, 'release-notes');
    }

    public function getOverviewDocument(): ?AbstractDocument
    {
        $docs = [
            self::getNewAndNoteworthy(),
            self::getServerGuide(),
            self::getReleaseNotes()
        ];
        foreach ($docs as $doc) {
            if ($doc->exists()) {
                return $doc;
            }
        }
        return null;
    }

    public function getServerGuide(): Book
    {
        return self::createBook('Server Guide', 'ServerGuide', 'ServerGuide.pdf'); // ancient engine guide
    }

    public function getNewAndNoteworthy(): ReleaseDocument
    {
        return self::createReleaseDocument('N&N', 'NewAndNoteworthy.html', 'new-and-noteworthy');
    }
    
    public function getOverviewUrl(): string
    {
        return self::createBaseUrl();
    }
    
    public function getMinorUrl(): string
    {
        if (Version::isValidVersionNumber($this->versionNumber)) {
            return '/doc/' . (new Version($this->versionNumber))->getMinorVersion();
        }
        return '/doc/' . $this->versionNumber;
    }
    
    public function getHotfixHowToDocument(): SimpleDocument
    {
        $filename = 'HowTo_Hotfix_AxonIvyEngine.txt';
        
        $path = self::createHotFixFilePath($filename);
        if (!file_exists($path)) {
            $filename = 'HowTo_Hotfix_XpertIvyServer.txt';
        }
        
        $path = self::createHotFixFilePath($filename);
        $url = '/releases/ivy/' . $this->versionNumber . '/hotfix/' . $filename;
        return new SimpleDocument('How to install Hotfix', $path, $url);
    }
    
    private function createHotFixFilePath(string $filename): string
    {
        return Config::releaseDirectory() . '/' . $this->versionNumber . '/hotfix/' . $filename;
    }
}
