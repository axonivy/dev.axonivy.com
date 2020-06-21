<?php
namespace app\domain\market;

class Market
{

    public static function all(): array
    {
        $dirs = array_filter(glob(__DIR__ . '/products/*'), 'is_dir');
        $products = [];
        foreach ($dirs as $dir) {
            $infoFile = $dir . '/info.json';
            if (file_exists($infoFile)) {
                $key = basename($dir);
                $products[] = new Product($key, $infoFile);
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
