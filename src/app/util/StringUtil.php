<?php
namespace app\util;

class StringUtil
{

    public static function contains($string, $contains): bool
    {
        if (strpos($string, $contains) !== false) {
            return true;
        }
        return false;
    }
    
    public static function startsWith($string, $startsWith): bool
    {
        return substr($string, 0, strlen($startsWith)) == $startsWith;
    }
}