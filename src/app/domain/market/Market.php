<?php

namespace app\domain\market;

use app\Config;
use app\domain\util\StringUtil;

class Market
{

  private static $types = null;

  public static function all(): array
  {
    $dirs = array_filter(glob(Config::marketDirectory() . '/*'), 'is_dir');
    $products = [];
    foreach ($dirs as $dir) {
      $metaFile = $dir . '/meta.json';
      if (file_exists($metaFile)) {
        $key = basename($dir);
        $products[] = ProductFactory::create($key, $dir, $metaFile);
      }
    }
    usort($products, fn (Product $a, Product $b) => $a->getSort() - $b->getSort());
    return $products;
  }

  public static function getProductByKey($key): ?Product
  {
    foreach (self::all() as $product) {
      if ($key == $product->getKey()) {
        return $product;
      }
    }
    return null;
  }

  public static function search(array $products, string $searchQuery): array
  {
    if (empty($searchQuery)) {
      return $products;
    }

    $listed = [];
    foreach ($products as $product) {
      if (StringUtil::containsIgnoreCase($product->getName(), $searchQuery)) {
        $listed[] = $product;
      } else if (StringUtil::containsIgnoreCase($product->getDescription(), $searchQuery)) {
        $listed[] = $product;
      }
    }
    return $listed;
  }

  public static function searchByType(array $products, string $searchType) {
    if (empty($searchType)) {
      return $products;
    }

    $listed = [];
    foreach ($products as $product) {
      if (strcasecmp($product->getType(), $searchType) == 0) {
        $listed[] = $product;
      }
    }
    return $listed;
  }

  public static function searchByTag(array $products, array $searchTags): array
  {
    if (empty($searchTags) || count($searchTags) == 1 && empty($searchTags[0])) {
      return $products;
    }

    $listed = [];
    $tags = array_map('strtolower', $searchTags);
    foreach ($products as $product) {
      foreach ($product->getTags() as $tag) {
        if (in_array(strtolower($tag), $tags)) {
          $listed[] = $product;
          break;
        }
      }
    }
    return $listed;
  }

  public static function listed(): array
  {
    return array_filter(self::all(), fn (Product $product) => $product->isListed());
  }

  public static function types(): array
  {
    if (self::$types == null)
    {
      self::$types = [
        new Type('All Types', '', 'si-types'), 
        new Type('Connectors', 'connector', 'si-connector'), 
        new Type('Diagrams', 'diagram', 'si-diagram'),
        new Type('Solutions', 'solution', 'si-lab-flask'), 
        new Type('Utils', 'util', 'si-util')];
    }
    return self::$types;
  }

  public static function tags(array $products): array
  {
    $tags = [];
    foreach ($products as $product) {
      foreach ($product->getTags() as $tag) {
        $tags[] = strtolower($tag);
      }
    }
    $tags = array_unique($tags);
    sort($tags);
    return $tags;
  }
}
