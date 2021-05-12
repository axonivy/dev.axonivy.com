<?php

namespace app\domain\market;

use app\Config;

class MarketInstallCounter
{
  public static function getInstallCount(string $key): int
  {
    $json = self::readInstallations();
    return $json[$key] ?? self::writeInitialInstallations($json, $key);
  }

  public static function incrementInstallCount(string $key)
  {
    $json = self::readInstallations();
    if (isset($json[$key])) {
      $json[$key] ++;
    }
    self::writeInstallations($json);
  }
  
  private static function readInstallations(): mixed
  {
    $installFile = Config::marketInstallationsFile();
    $json = [];
    if (file_exists($installFile)) {
      $content = file_get_contents($installFile);
      $json = json_decode($content, true);
    } 
    return $json;
  }
  
  private static function writeInitialInstallations(mixed $json, string $key): int
  {
    $initialCount = rand(20, 50);
    $json[$key] = $initialCount;
    self::writeInstallations($json);
    return $initialCount;
  }

  private static function writeInstallations(mixed $json)
  {
    if ($file = fopen(Config::marketInstallationsFile(), 'w')) {
      fwrite($file, json_encode($json));
      fclose($file);
    }
  }
}
