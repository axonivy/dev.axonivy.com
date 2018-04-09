<?php
namespace app\util;

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
}
