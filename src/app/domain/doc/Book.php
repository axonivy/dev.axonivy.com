<?php

namespace app\domain\doc;

class Book extends AbstractDocument
{
  private $pdfFile;

  public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path, string $pdfFile)
  {
    parent::__construct($name, $rootPath, $baseUrl, $baseRessourceUrl, $path);
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
    return file_exists(parent::getRootPath() . '/' . $this->pdfFile);
  }
}
