<?php
namespace app\domain\market;

use app\Config;

class Market
{

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
        usort($products, fn (Product $a, Product $b) => $a->getSort() > $b->getSort());
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

    public static function listed(): array
    {
        $listed = [];
        foreach (self::all() as $product) {
            if ($product->isListed()) {
                $listed[] = $product;
            }
        }
        return $listed;
    }
}
