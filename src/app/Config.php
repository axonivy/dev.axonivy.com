<?php 
namespace app;

use app\util\StringUtil;

class Config {
    
    public static function initConfig()
    {
        define('CDN_HOST', 'https://download.axonivy.com');
        define('CDN_HOST_SPRINT', CDN_HOST . '/sprint/');
        define('CDN_HOST_NIGHTLY', CDN_HOST . '/nightly/');
        
        define('BASE_URL', self::getRequestedBaseUri());
        $PERMALINK_BASE_URL = BASE_URL . '/permalink/ivy/';
        define('PERMALINK_SPRINT', $PERMALINK_BASE_URL . 'sprint/');
        define('PERMALINK_NIGHTLY', $PERMALINK_BASE_URL . 'nightly/');
        define('PERMALINK_STABLE', $PERMALINK_BASE_URL . 'stable/');
        
        define('MAVEN_SUPPORTED_RELEASES_SINCE_VERSION', '6.0.0');
        
        $rootDir = '/home/axonivya/data/ivy-releases';
        if (self::isDevOrTestEnv()) {
            $rootDir = __DIR__ . '/../../test/data/webroot/releases/ivy';
        }
        define('IVY_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir]));
        define('IVY_SPRINT_RELEASE_DIRECTORY', StringUtil::createPath([IVY_RELEASE_DIRECTORY, 'sprint']));
        define('IVY_NIGHTLY_RELEASE_DIRECTORY', StringUtil::createPath([IVY_RELEASE_DIRECTORY, 'nightly']));
        
        define('UNSAFE_RELEASES', [
            '6.7.1' => '7.0',
            '6.7.0' => '7.0',
            '6.6.1' => '7.0',
            '6.6.0' => '7.0',
            '6.5.0' => '7.0',
            '6.4.0' => '7.0',
            '6.3.0' => '7.0',
            '6.2.0' => '7.0',
            '6.1.0' => '7.0',
            '6.0.10' => '6.0.11',
            '6.0.9' => '6.0.11',
            '6.0.8' => '6.0.11',
            '6.0.7' => '6.0.11',
            '6.0.6' => '6.0.11',
            '6.0.5' => '6.0.11',
            '6.0.4' => '6.0.11',
            '6.0.3' => '6.0.11',
            '6.0.2' => '6.0.11',
            '6.0.1' => '6.0.11',
            '6.0.0' => '6.0.11',
        ]);
        
        define('IVY_VERSIONS', [
            '7.x' => 'Leading Edge - LE',
            '7.0' => 'Long Term Support - LTS',
            '6.0' => 'Long Term Support - LTS',
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
        
        define('LTS_VERSIONS', $lts);
    }
    
    private static function getRequestedBaseUri(): string
    {
        return (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    }
    
    private static function isDevOrTestEnv(): bool
    {
        return file_exists(StringUtil::createPath([__DIR__, '..', '..', 'Jenkinsfile']));
    }
}
