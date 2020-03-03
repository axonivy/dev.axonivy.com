<?php
namespace app\util;

class ArrayUtil
{
    public static function getLastElementOrNull(array $array)
    {
        if (empty($array)) {
            return null;
        }
        return end($array);
    }
}
