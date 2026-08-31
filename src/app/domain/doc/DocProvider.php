<?php
namespace app\domain\doc;

use app\domain\Version;
use app\Config;
// use app\pages\news\NewsAction;

class DocProvider
{
  /**
   * Minor version number
   * @var $versionNumber
   */
  private string $versionNumber = '';
  const DEFAULT_LANGUAGE = "en";

  public function __construct(string $versionNumber)
  {
    $this->versionNumber = $versionNumber;
  }

  public function exists(): bool
  {
    return file_exists($this->getDefaultLanguageDocDir());
  }

  private function getDocDir()
  {
    $versionNumber = (string) $this->versionNumber;
    return Config::docDirectory() . "/" . $versionNumber;
  }

  private function getDefaultLanguageDocDir()
  {
    return $this->getDocDir() . "/" . self::DEFAULT_LANGUAGE;
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
    $values = array_values($docs);
    return array_shift($values);
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
      $this->createExternalBook('Designer Guide', 'DesignerGuideHtml'), // legacy engine guide prior to 8.0
      $this->createExternalBook('Designer Guide', 'designer-guide'), // new guide since 8.0

      $this->createExternalBook('Engine Guide', 'EngineGuideHtml'), // legacy engine guide prior to 7.4
      $this->createExternalBook('Engine Guide', 'engine-guide'), // new engine guide since 7.4

      $this->createExternalBook('Public API', 'PublicAPI'),  // legacy public api url
      $this->createExternalBook('Public API', 'public-api'),  // new url since 8.0

      $this->getNewAndNoteworthy(), // since 9.1 not available
      $this->getReleaseNotes(), // since 9.1 part of product documentation
      $this->getMigrationNotes(), // since 9.1 part of product documentation
      $this->createReleaseDocument('ReadMe', 'ReadMe.html', 'readme'), // since 9.1 not available
      $this->createReleaseDocument('ReadMe Engine', 'ReadMeEngine.html', 'readme-engine'), // legacy
      $this->createReleaseDocument('ReadMe Server', 'ReadMeServer.html', 'readme-server')  // legacy
    ];
    return array_values(array_filter($documents, function ($doc) {
      return $doc != null && $doc->exists();
    }));
  }

  private function createExternalBook($name, $path): ExternalBook
  {
    $rootPath = $this->getDocDir();
    $baseUrl = $this->createBaseUrl();
    $baseRessourceUrl = $this->createBaseResourceUrl();
    return new ExternalBook($name, $rootPath, $baseUrl, $baseRessourceUrl, $path . '/', self::DEFAULT_LANGUAGE);
  }

  private function createReleaseDocument($name, $path, $niceUrlPath): ReleaseDocument
  {
    $rootPath = $this->getDocDir();
    $baseUrl = $this->createBaseUrl();
    $baseRessourceUrl = $this->createBaseResourceUrl();
    return new ReleaseDocument($name, $rootPath, $baseUrl, $baseRessourceUrl, $path, self::DEFAULT_LANGUAGE, $niceUrlPath);
  }

  private function createBaseUrl(): string
  {
    return '/doc/' . (string) $this->versionNumber;
  }

  private function createBaseResourceUrl(): string
  {
    return '/docs/' . (string) $this->versionNumber;
  }

  public function getReleaseNotes(): ReleaseDocument
  {
    return $this->createReleaseDocument('Release Notes', 'ReleaseNotes.txt', 'release-notes');
  }

  private function getMigrationNotes(): ReleaseDocument
  {
    return $this->createReleaseDocument('Migration Notes', 'MigrationNotes.html', 'migration-notes');
  }

  public function getOverviewDocument(): ?AbstractDocument
  {
    $docs = [
      $this->getNewAndNoteworthy(),
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

  public function getNewAndNoteworthy(): ?ReleaseDocument
  {
    $versionNumber = (string) $this->versionNumber;
    if (version_compare($versionNumber, 8) >= 0) {      
      return $this->createReleaseDocument('News', 'NewAndNoteworthy.html', 'new-and-noteworthy');
    }
    return $this->createReleaseDocument('N&N', 'NewAndNoteworthy.html', 'new-and-noteworthy');
  }

  public function getOverviewUrl(): string
  {
    return $this->createBaseUrl();
  }

  public function getLanguageOverviewUrl(string $lang): string
  {
    return $this->getOverviewUrl() . '/' . $lang;
  }

  public function getMinorUrl(): string
  {
    $versionNumber = (string) $this->versionNumber;
    if (Version::isValidVersionNumber($versionNumber)) {
      $v = $this->getMinorVersion();
      if ((new DocProvider($v))->exists()) {
        return '/doc/' . $v;
      }
    }
    return $this->getOverviewUrl();
  }

  public function getMinorVersion(): string 
  {
    return (new Version((string) $this->versionNumber))->getMinorVersion();
  }

  public function getLanguageMinorUrl(string $lang): string 
  {
    return $this->getMinorUrl() . '/' . $lang;
  }

  public function getDefaultLanguageMinorUrl(): string
  {
    return $this->getLanguageMinorUrl(self::DEFAULT_LANGUAGE);
  }

  public function getLanguages(): array
  {
    $languages = [];
    $docDir = $this->getDocDir();
    $files = scandir($docDir);
    foreach ($files as $file) {
      if (is_dir($docDir . '/' . $file) && strlen($file) == 2 && $file != "..") {
        $languages[] = $file;
      }
    }
    return $languages;
  }
}
