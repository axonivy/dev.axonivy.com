<?php 
namespace app;

class Config {

    public const NUMBER_LTS = 2;
    
    public const MAVEN_SUPPORTED_RELEASES_SINCE_VERSION = '6.0.0';
    public const DOCKER_IMAGE_SINCE_VERSION = '7.2.0';
    public const MAVEN_ARTIFACTORY_URL = 'https://repo.axonivy.rocks/';
    public const CDN_URL = 'https://download.axonivy.com';
    public const DOCKER_HUB_IMAGE_URL = 'https://hub.docker.com/r/axonivy/axonivy-engine';
    public const DOCKER_IMAGE_ENGINE = 'axonivy/axonivy-engine';

    public const CLONE_DOC_SCRIPT = '/home/axonivya/script/clonedoc.sh';
    public const DOC_DIRECTORY_THIRDPARTY = '/home/axonivya/data/doc-cache';

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
        return self::isProductionEnvironment() ? '/home/axonivya/data/market/market' : __DIR__ . '/../../src/web/_market';
    }
}
