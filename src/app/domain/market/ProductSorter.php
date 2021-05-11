<?php

namespace app\domain\market;

use app\Config;
use app\domain\util\StringUtil;

class ProductSorter
{
    public static function sort(array $products)
    {
      usort($products, fn (Product $a, Product $b) => self::compare($a, $b));
    }

    private static function compare(Product $a, Product $b)
    {
      $sortA = self::typeSort($a);
      $sortB = self::typeSort($b);
      if ($sortA == $sortB) {
        return strcasecmp(strtolower($a->getName()), strtolower($b->getName()));
      }
      return $sortA - $sortB;
    }
  
    private static function typeSort(Product $product): int
    {
      $prio = 0;
      foreach (Market::types() as $type) {
        if ($type->getFilter() == $product->getType()) {
          return $prio;
        }
        $prio++;
      }
      return $prio;
    }
}
