<?php 
namespace app;

class Config {
    
    public static function initConfig()
    {
        define('CDN_HOST', 'https://download.axonivy.com');
        
        define('BASE_URL', self::getRequestedBaseUri());
        define('PERMALINK_BASE_URL', BASE_URL . '/permalink/');
        
        define('MAVEN_SUPPORTED_RELEASES_SINCE_VERSION', '6.0.0');
        
        $rootDir = '/home/axonivya/data/ivy-releases';
        $productiveSystem = true;
        if (self::isDevOrTestEnv()) {
            $rootDir = __DIR__ . '/../../src/web/releases/ivy';
            $productiveSystem = false;
        }
        define('IVY_RELEASE_DIRECTORY', $rootDir);
        define('PRODUCTIVE_SYSTEM', $productiveSystem);
        
        define('DOC_DIRECTORY_THIRDPARTY', '/home/axonivya/data/doc-cache');
        define('CLONE_DOC_SCRIPT', '/home/axonivya/script/clonedoc.sh');
        
        define('IVY_VERSIONS', [
            //'9' => 'Leading Edge - LE', // do not use 9.x -> 
            '8.0' => 'Long Term Support - LTS',
            '7.x' => 'UNSUPPORTED',
            '7.0' => 'Long Term Support - LTS',
            '6.0' => 'UNSUPPORTED',
            '6.x' => 'UNSUPPORTED',
            '5.1' => 'UNSUPPORTED',
            '5.0' => 'UNSUPPORTED',
            '4.3' => 'UNSUPPORTED',
            '4.2' => 'UNSUPPORTED',
            '3.9' => 'UNSUPPORTED'
        ]);
        
        $lts = [];
        foreach (IVY_VERSIONS as $version => $description) {
            if ($description == 'Long Term Support - LTS') {
                $lts[] = $version;
            }
        }
        
        $le = null;
        foreach (IVY_VERSIONS as $version => $description) {
            if ($description == 'Leading Edge - LE') {
                $le = $version;
            }
        }
        
        define('LTS_VERSIONS', $lts);
        define('LE_VERSION', $le);
        
        define('MAVEN_ARTIFACTORY_URL', 'https://repo.axonivy.rocks/');
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
