<?php 
namespace app;

use app\util\StringUtil;

class Config {
    
    public static function initConfig()
    {
        define('MAVEN_SUPPORTED_RELEASES_SINCE_VERSION', '6.0.0');
        
        define('CDN_HOST', 'https://download.axonivy.com');
        define('CDN_HOST_DEV_RELEASES', 'https://d3ao4l46dir7t.cloudfront.net');
        
 
        $rootDir = '/home/axonivya/www/developer.axonivy.com';
        if (self::isDevOrTestEnv()) {
            $rootDir = '/var/www/html/test/data/webroot';
        }
        
        define('IVY_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'releases', 'ivy']));
        define('IVY_NIGHTLY_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'dev-releases', 'ivy', 'nightly', 'current']));
        define('IVY_SPRINT_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'dev-releases', 'ivy', 'sprint-release', 'Jakobshorn', '7.1.0-S8']));
        
        
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
