<?php

namespace app\domain\util;

class StringUtil
{

  public static function containsIgnoreCase($string, $contains): bool
  {
    if (stripos($string, $contains) !== false) {
      return true;
    }
    return false;
  }
}
