<?php

namespace app\domain\doc;

abstract class AbstractDocument
{
  private $name;

  private $rootPath;
  private $baseUrl;
  private $baseRessourceUrl;

  private $path;

  public function __construct(string $name, string $rootPath, string $baseUrl, string $baseRessourceUrl, string $path)
  {
    $this->name = $name;
    $this->rootPath = $rootPath;
    $this->baseUrl = $baseUrl;
    $this->baseRessourceUrl = $baseRessourceUrl;
    $this->path = $path;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getUrl(): string
  {
    return $this->baseUrl . '/' . $this->path;
  }

  public function getRessourceUrl(): string
  {
    return $this->baseRessourceUrl . '/' . $this->path;
  }

  public function getPath()
  {
    return $this->path;
  }

  public function exists(): bool
  {
    return file_exists($this->rootPath . '/' . $this->path);
  }

  protected function getBaseUrl(): string
  {
    return $this->baseUrl;
  }

  protected function getRootPath(): string
  {
    return $this->rootPath;
  }
}
