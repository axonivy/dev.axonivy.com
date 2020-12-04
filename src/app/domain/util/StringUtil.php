<?php

namespace app\domain\util;

class StringUtil
{

  public static function contains($string, $contains): bool
  {
    if (strpos($string, $contains) !== false) {
      return true;
    }
    return false;
  }

  public static function containsIgnoreCase($string, $contains): bool
  {
    if (stripos($string, $contains) !== false) {
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

  public static function isFirstCharacterNumeric($string): bool
  {
    return is_numeric(substr($string, 0, 1));
  }

  public static function notEqual($string1, $string2): bool
  {
    return strcmp($string1, $string2) !== 0;
  }
}
