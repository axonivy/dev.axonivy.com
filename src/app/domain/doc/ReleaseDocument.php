<?php

namespace app\domain\doc;

class ReleaseDocument extends AbstractDocument
{
  private $niceUrlPath;

  public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path, string $niceUrlPath)
  {
    parent::__construct($name, $rootPath, $baseUrl, $baseRessourceUrl, $path);
    $this->niceUrlPath = $niceUrlPath;
  }

  public function getNiceUrlPath()
  {
    return $this->niceUrlPath;
  }

  public function getUrl(): string
  {
    return $this->getBaseUrl() . '/' . $this->getNiceUrlPath();
  }
}
