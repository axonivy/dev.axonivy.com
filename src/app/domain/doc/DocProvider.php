<?php
namespace app\domain\doc;

use app\domain\Version;
use app\Config;
use app\pages\news\NewsAction;

class DocProvider
{
  /**
   * Minor version number
   * @var $versionNumber
   */
  private string $versionNumber;

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
    return !empty($this->findAllDocuments());
  }

  private function getDocDir()
  {
    return Config::docDirectory() . "/" . $this->versionNumber;
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
    return array_filter($this->findAllDocuments(), function (AbstractDocument $doc) {
      return $doc instanceof Book;
    });
  }

  public static function getNewestDocProvider(): DocProvider
  {
    $versions = [];
    $directories = array_filter(glob(Config::docDirectory() . '/*'), 'is_dir');
    foreach ($directories as $directory) {
      $versions[] = basename($directory);      
    }
    usort($versions, function (string $v1, string $v2) {
      return version_compare($v2, $v1);
    });
    return new DocProvider($versions[0]);
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
    return array_filter($this->getBooks(), fn (Book $book) => !str_starts_with(strtolower($book->getName()), "portal"));
  }

  public function getNotImportantBooks(): array
  {
    return array_filter($this->getBooks(), function (Book $book) {
      return str_starts_with(strtolower($book->getName()), "portal");
    });
  }

  public function getExternalBooks(): array
  {
    return array_filter($this->findAllDocuments(), function (AbstractDocument $doc) {
      return $doc instanceof ExternalBook;
    });
  }

  public function getReleaseDocuments(): array
  {
    return array_filter($this->findAllDocuments(), function (AbstractDocument $doc) {
      return $doc instanceof ReleaseDocument;
    });
  }

  private function findAllDocuments(): array
  {
    $documents = [
      $this->createBook('Designer Guide', 'DesignerGuideHtml', 'DesignerGuide.pdf'), // legacy engine guide prior to 8.0
      $this->createBook('Designer Guide', 'designer-guide', ''), // new guide since 8.0

      $this->getServerGuide(),
      $this->createBook('Engine Guide', 'EngineGuideHtml', 'EngineGuide.pdf'), // legacy engine guide prior to 7.4
      $this->createBook('Engine Guide', 'engine-guide', ''), // new engine guide since 7.4

      $this->createBook('Portal Kit', 'PortalKitHtml', 'PortalKitDocumentation.pdf'),  // legacy
      $this->createBook('Portal Connector', 'PortalConnectorHtml', 'PortalConnectorDocumentation.pdf'), // legacy

      $this->createExternalBook('Public API', 'PublicAPI'),  // legacy public api url
      $this->createExternalBook('Public API', 'public-api'),  // new url since 8.0

      $this->getNewAndNoteworthy(), // since 9.1 not available
      $this->getReleaseNotes(), // since 9.1 part of product documentation
      $this->getMigrationNotes(), // since 9.1 part of product documentation
      $this->createReleaseDocument('ReadMe', 'ReadMe.html', 'readme'), // since 9.1 not available
      $this->createReleaseDocument('ReadMe Engine', 'ReadMeEngine.html', 'readme-engine'), // legacy
      $this->createReleaseDocument('ReadMe Server', 'ReadMeServer.html', 'readme-server')  // legacy
    ];
    return array_filter($documents, function (AbstractDocument $doc) {
      return $doc->exists();
    });
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
    return Config::docDirectory() . '/' . $this->versionNumber;
  }

  private function createBaseUrl(): string
  {
    return '/doc/' . $this->versionNumber;
  }

  private function createBaseRessourceUrl(): string
  {
    return '/docs/' . $this->versionNumber;
  }

  public function getReleaseNotes(): ReleaseDocument
  {
    $version = new Version($this->versionNumber);
    $fileName = 'ReleaseNotes.txt';
    if ($version->getMinorVersion() == '3.9') {
      $fileName = 'ReadMe.html';
    }
    return $this->createReleaseDocument('Release Notes', $fileName, 'release-notes');
  }

  private function getMigrationNotes(): ReleaseDocument
  {
    return $this->createReleaseDocument('Migration Notes', 'MigrationNotes.html', 'migration-notes');
  }

  public function getOverviewDocument(): ?AbstractDocument
  {
    $docs = [
      $this->getNewAndNoteworthy(),
      $this->getServerGuide(),
      $this->getReleaseNotes()
    ];
    foreach ($docs as $doc) {
      if ($doc->exists()) {
        return $doc;
      }
    }
    return null;
  }

  public function getQuickDocuments(): array
  {
    $news = $this->getNewAndNoteworthy();
    $docs = [];
    if ($news != null) {
      $docs[] = $news;
    }
    $docs[] = $this->getReleaseNotes();
    $docs[] = $this->getMigrationNotes();
    return $docs;
  }

  public function getServerGuide(): Book
  {
    return $this->createBook('Server Guide', 'ServerGuide', 'ServerGuide.pdf'); // ancient engine guide
  }

  public function getNewAndNoteworthy(): ?ReleaseDocument
  {
    if (version_compare($this->versionNumber, 8) >= 0) {      
      if (NewsAction::exists($this->versionNumber)) {
        return $this->createReleaseDocument('News', 'NewAndNoteworthy.html', 'new-and-noteworthy');
      }
      return null;
    }
    return $this->createReleaseDocument('N&N', 'NewAndNoteworthy.html', 'new-and-noteworthy');
  }

  public function getOverviewUrl(): string
  {
    return $this->createBaseUrl();
  }

  public function getMinorUrl(): string
  {
    if (Version::isValidVersionNumber($this->versionNumber)) {
      $v = (new Version($this->versionNumber))->getMinorVersion();
      if ((new DocProvider($v))->exists()) {
        return '/doc/' . $v;
      }
    }
    return $this->getOverviewUrl();
  }

  public function getHotfixHowToDocument(): SimpleDocument
  {
    $filename = 'HowTo_Hotfix_AxonIvyEngine.txt';

    $path = $this->createHotFixFilePath($filename);
    if (!file_exists($path)) {
      $filename = 'HowTo_Hotfix_XpertIvyServer.txt';
    }

    $path = $this->createHotFixFilePath($filename);
    $url = '/releases/ivy/' . $this->versionNumber . '/hotfix/' . $filename;
    return new SimpleDocument('How to install Hotfix', $path, $url);
  }

  private function createHotFixFilePath(string $filename): string
  {
    return Config::releaseDirectory() . '/' . $this->versionNumber . '/hotfix/' . $filename;
  }
}
