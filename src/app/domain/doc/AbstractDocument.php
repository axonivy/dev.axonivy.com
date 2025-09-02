<?php

namespace app\domain\doc;

abstract class AbstractDocument
{
  private $name;

  private $rootPath;
  private $baseUrl;
  private $baseRessourceUrl;

  private $path;
  private $lang;

  public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path, string $lang)
  {
    $this->name = $name;
    $this->rootPath = $rootPath;
    $this->baseUrl = $baseUrl;
    $this->baseRessourceUrl = $baseRessourceUrl;
    $this->path = $path;
    $this->lang = $lang;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getUrl(): string
  {
    return $this->baseUrl . '/' . $this->lang . '/' . $this->path;
  }

  public function getLanguageResourceUrl(String $lang): string 
  {
    return $this->baseRessourceUrl . '/' . $lang . '/' . $this->path;
  }

  public function exists(): bool
  {
    return file_exists($this->rootPath . '/' . $this->lang . '/' . $this->path);
  }

  protected function getBaseUrl(): string
  {
    return $this->baseUrl;
  }

  protected function getRootPath(): string
  {
    return $this->rootPath;
  }

  protected function getLanguage(): string 
  {
    return $this->lang;
  }
}
