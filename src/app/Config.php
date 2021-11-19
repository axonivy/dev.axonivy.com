<?php

namespace app;

class Config
{

  public const NUMBER_LTS = 2;

  public const MAVEN_SUPPORTED_RELEASES_SINCE_VERSION = '6.0.0';
  public const DOCKER_IMAGE_SINCE_VERSION = '7.2.0';
  public const MAVEN_ARTIFACTORY_URL = 'https://repo.axonivy.rocks/';
  public const CDN_URL = 'https://download.axonivy.com';
  public const DOCKER_HUB_IMAGE_URL = 'https://hub.docker.com/r/axonivy/axonivy-engine';
  public const DOCKER_IMAGE_ENGINE = 'axonivy/axonivy-engine';

  public static function isProductionEnvironment()
  {
    return !file_exists(__DIR__ . '/../../Jenkinsfile');
  }

  public static function releaseDirectory(): string
  {
    return self::isProductionEnvironment() ? '/home/axonivya/data/ivy-releases' : __DIR__ . '/../../src/web/releases/ivy';
  }

  public static function marketDirectory(): string
  {
    return self::isProductionEnvironment() ? '/home/axonivya/data/market' : __DIR__ . '/../../src/web/_market';
  }
  
  public static function marketCacheDirectory(): string
  {
      return self::isProductionEnvironment() ? '/home/axonivya/data/market-cache' : __DIR__ . '/../../src/web/market-cache';
  }
  
  public static function docCacheDirectory(): string
  {
    return self::isProductionEnvironment() ? '/home/axonivya/data/doc-cache' : __DIR__ . '/../../src/web/documentation';
  }
  
  public static function marketInstallationsFile(): string
  {
    return self::isProductionEnvironment() ? '/home/axonivya/data/market-installations.json' : '/tmp/market-installations.json';
  }
  
  public static function unzipper(): string
  {
    return __DIR__ . '/download-zip.sh';    
  }
}
