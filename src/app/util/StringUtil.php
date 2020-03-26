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
    
    public static function endsWith($string, $endsWith): bool
    {
        $length = strlen($endsWith);
        return $length === 0 || (substr($string, -$length) === $endsWith);
    }
    
    public static function createPath(array $elements): string
    {
        return implode(DIRECTORY_SEPARATOR, $elements);
    }

    public static function isFirstCharacterNumeric($string): bool
    {
        return is_numeric(substr($string, 0, 1));
    }
}
