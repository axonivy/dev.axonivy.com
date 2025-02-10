<?php

namespace app\domain;

class Artifact
{
  public const PRODUCT_NAME_ENGINE = 'engine';
  public const PRODUCT_NAME_DESIGNER = 'designer';

  public const TYPE_WINDOWS = 'Windows';
  public const TYPE_LINUX = 'Linux';
  public const TYPE_MAC = 'macOS';
  public const TYPE_MAC_BETA = 'MacOSX-BETA';
  public const TYPE_MAC_BETA_NEW = 'macOS-BETA';
  public const TYPE_ALL = 'All'; // All platforms
  public const TYPE_DOCKER = 'docker'; // no download artifacts available

  public const ARCHITECTURE_X64 = 'x64';
  public const ARCHITECTURE_X86 = 'x86';

  private string $fileName; // real filename 
  private string $productName;  // see PRODUCT_* constants
  private string $versionNumber; // version parsed from filename
  private string $type; // see TYPE_* constants
  private string $architecture; // see ARCHITECTURE_* constants
  private string $shortType;
  private bool $isMavenPluginCompatible;
  private string $permalink;
  private string $downloadUrl;
  private string $folderName;
  private string $downloadBomUrl;

  public function __construct(
    string $fileName,
    string $productName,
    string $versionNumber,
    string $type,
    string $architecture,
    string $shortType,
    bool $isMavenPluginCompatible,
    string $permalink,
    string $downloadUrl,
    string $folderName,
    string $downloadBomUrl
  ) {
    $this->fileName = $fileName;
    $this->productName = $productName;
    $this->versionNumber = $versionNumber;
    $this->type = $type;
    $this->architecture = $architecture;
    $this->shortType = $shortType;
    $this->isMavenPluginCompatible = $isMavenPluginCompatible;
    $this->permalink = $permalink;
    $this->downloadUrl = $downloadUrl;
    $this->folderName = $folderName;
    $this->downloadBomUrl = $downloadBomUrl;
  }

  public function getVersion(): Version
  {
    return new Version($this->versionNumber);
  }

  public function getDownloadUrl(): string
  {
    return $this->downloadUrl;
  }

  public function getDownloadBomUrl(): string
  {
    return $this->downloadBomUrl;
  }

  public function getInstallationUrl(): string
  {
    $url = $this->getDownloadUrl();
    return "/installation" . "?downloadUrl=$url" . "&version=$this->folderName" . "&product=$this->productName" . "&type=$this->type";
  }

  public function getProductName(): string
  {
    return $this->productName;
  }

  public function getFileName(): string
  {
    return $this->fileName;
  }

  public function isMavenPluginCompatible(): bool
  {
    return $this->isMavenPluginCompatible;
  }

  public function getType()
  {
    return $this->type;
  }

  public function isBeta(): bool
  {
    $filename = strtolower($this->fileName);
    return str_contains($filename, 'beta');
  }

  public function getPermalink(): string
  {
    return $this->permalink;
  }

  public function hasBom(): bool {
    return !empty($this->downloadBomUrl);
  }
}
