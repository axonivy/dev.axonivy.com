<?php 
namespace app;

use app\util\StringUtil;

class Config {
    
    public static function initConfig()
    {
        define('CDN_HOST', 'https://download.axonivy.com');
        define('CDN_HOST_SPRINT', CDN_HOST . '/sprint');
        define('CDN_HOST_NIGHTLY', CDN_HOST . '/nightly');
        
        
        
        
        
        
        
        define('BASE_URL', 'https://developer.axonivy.com');
        
        
        
        define('MAVEN_SUPPORTED_RELEASES_SINCE_VERSION', '6.0.0');
 
        $rootDir = '/home/axonivya/www/developer.axonivy.com';
        if (self::isDevOrTestEnv()) {
            $rootDir = __DIR__ . '/../../test/data/webroot';
        }
        
        define('IVY_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'releases', 'ivy']));
        
        define('IVY_SPRINT_RELEASE_DIR_RELATIVE', 'sprint');
        define('IVY_SPRINT_RELEASE_DIRECTORY', StringUtil::createPath([IVY_RELEASE_DIRECTORY, IVY_SPRINT_RELEASE_DIR_RELATIVE]));
        
        define('IVY_NIGHTLY_RELEASE_DIR_RELATIVE', 'nightly');
        define('IVY_NIGHTLY_RELEASE_DIRECTORY', StringUtil::createPath([IVY_RELEASE_DIRECTORY, IVY_NIGHTLY_RELEASE_DIR_RELATIVE]));
        
        $UNSAVE_VERSIONS = [
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
        ];
        define('UNSAFE_RELEASES', $UNSAVE_VERSIONS);
    }
    
    private static function isDevOrTestEnv(): bool
    {
        return file_exists(StringUtil::createPath([__DIR__, '..', '..', 'Jenkinsfile']));
    }
}
