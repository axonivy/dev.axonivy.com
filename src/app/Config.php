<?php 
namespace app;

class Config {

    public const NUMBER_LTS = 2;
    
    public const MAVEN_SUPPORTED_RELEASES_SINCE_VERSION = '6.0.0';
    public const MAVEN_ARTIFACTORY_URL = 'https://repo.axonivy.rocks/';
    public const CDN_URL = 'https://download.axonivy.com';

    public const CLONE_DOC_SCRIPT = '/home/axonivya/script/clonedoc.sh';
    public const DOC_DIRECTORY_THIRDPARTY = '/home/axonivya/data/doc-cache';

    
    
    
    public static function initConfig()
    {
        define('PERMALINK_BASE_URL', self::getRequestedBaseUri() . '/permalink/');
        
        $rootDir = '/home/axonivya/data/ivy-releases';
        if (self::isDevOrTestEnv()) {
            $rootDir = __DIR__ . '/../../src/web/releases/ivy';
        }
        define('IVY_RELEASE_DIRECTORY', $rootDir);
    }
    
    private static function getRequestedBaseUri(): string
    {
        return (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    }
    
    public static function isDevOrTestEnv(): bool
    {
        return file_exists(__DIR__ . '/../../Jenkinsfile');
    }
}
