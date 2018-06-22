<?php
namespace app\util;

class ArrayUtil
{

    public static function getSecondLastElementOrNull(array $array)
    {
        if (empty($array)) {
            return null;
        }
        if (count($array) == 1) {
            return $array[0];
        }
        $length = count($array);
        return $array[$length - 2];
    }
    
    public static function getLastElementOrNull(array $array)
    {
        if (empty($array)) {
            return null;
        }
        return end($array);
    }
    
    public static function getFirstElementOrNull(array $array) {
        return $array[0] ?? null;
    }
}