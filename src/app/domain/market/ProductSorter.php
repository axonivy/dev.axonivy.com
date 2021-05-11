<?php

namespace app\domain\market;

use app\Config;
use app\domain\util\StringUtil;

class ProductSorter
{
    public static function sort(array $products): array
    {
      usort($products, fn (Product $a, Product $b) => self::compare($a, $b));
      return $products;
    }

    private static function compare(Product $a, Product $b): int
    {
      return 
        self::typeSort($a) <=> self::typeSort($b)?:
        $a->getName() <=> $b->getName();
    }
  
    private static function typeSort(Product $product): int
    {
      $prio = 0;
      foreach (Market::types() as $type) {
        $prio++;
        if ($type->getFilter() === $product->getType()) {
          return $prio;
        }
        
      }
      return $prio;
    }
}
