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
        if (self::isDevEnv()) {
            $rootDir = '/var/www/html/test/data/webroot';
        }
        
        define('IVY_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'releases', 'ivy']));
        define('IVY_NIGHTLY_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'dev-releases', 'ivy', 'nightly', 'current']));
        define('IVY_SPRINT_RELEASE_DIRECTORY', StringUtil::createPath([$rootDir, 'dev-releases', 'ivy', 'sprint-release', 'Jakobshorn', '7.1.0-S8']));
    }
    
    private static function isDevEnv(): bool
    {
        return file_exists('../../Jenkinsfile');
    }
}
