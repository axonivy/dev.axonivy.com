<?php

namespace app;

class Config
{

  public const NUMBER_LTS = 2;

  public const MAVEN_SUPPORTED_RELEASES_SINCE_VERSION = '6.0.0';
  public const DOCKER_IMAGE_SINCE_VERSION = '7.2.0';
  public const MAVEN_ARTIFACTORY_URL = 'https://maven.axonivy.com/';
  public const CDN_URL = 'https://download.axonivy.com';
  public const DOCKER_HUB_IMAGE_URL = 'https://hub.docker.com/r/axonivy/axonivy-engine';
  public const DOCKER_IMAGE_ENGINE = 'axonivy/axonivy-engine';
  public const VSCODE_EXTENSION_SINCE_VERSION = '14.0';
  public const VSCODE_MARKETPLACE_URL = 'https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer';

  public static function isProductionEnvironment()
  {
    return !file_exists(__DIR__ . '/../../Jenkinsfile');
  }

  public static function releaseDirectory(): string
  {
    return self::isProductionEnvironment() ? '/home/axonivya/data/ivy-releases' : __DIR__ . '/../../src/web/releases/ivy';
  }

  public static function docDirectory(): string
  {
    return self::isProductionEnvironment() ? '/home/axonivya/data/doc' : __DIR__ . '/../../src/web/docs';
  }
}
