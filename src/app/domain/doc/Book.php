<?php

namespace app\domain\doc;

class Book extends AbstractDocument
{
  private $pdfFile;

  public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path, string $pdfFile, string $lang)
  {
    parent::__construct($name, $rootPath, $baseUrl, $baseRessourceUrl, $path, $lang);
    $this->pdfFile = $pdfFile;
  }

  public function getPdfUrl()
  {
    return parent::getBaseUrl() . '/' . $this->pdfFile;
  }

  public function pdfExists(): bool
  {
    if (empty($this->pdfFile)) {
      return false;
    }
    return file_exists(parent::getRootPath() . '/' . $this->getLanguage() . '/' . $this->pdfFile);
  }
}
