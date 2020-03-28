<?php
namespace app\domain\util;

class UserAgentDetector
{

    /**
     * Determines if the OS of the current request is a Linux based OS.
     * 
     * @return bool
     */
    public static function isOsLinux(): bool
    {
        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        return StringUtil::contains($userAgent, 'linux');   
    }

    /**
     * Determines if the OS of the current request is a Mac based OS.
     * 
     * @return bool
     */
    public static function isOsMac(): bool
    {
        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        return StringUtil::contains($userAgent, 'macintosh');
    }
    
    public static function isWindows(): bool
    {
        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        return StringUtil::contains($userAgent, 'win');
    }
}
