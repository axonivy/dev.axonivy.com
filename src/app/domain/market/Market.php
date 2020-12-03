<?php
namespace app\domain\market;

use app\Config;
use app\domain\util\StringUtil;

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

    public static function search(array $products, string $searchQuery): array
    {
        if (empty($searchQuery))
        {
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
    
    public static function searchByTag(array $products, string $searchTag): array
    {
        if (empty($searchTag))
        {
            return $products;
        }
        
        $listed = [];
        foreach ($products as $product) {
            foreach ($product->getTags() as $tag) {
                if (in_array(strtoupper($tag), explode(",", $searchTag))) {
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
    
    public static function tags(array $products): array
    {
        $tags = [];
        foreach ($products as $product) {
            foreach ($product->getTags() as $tag) {
                $tags[] = strtoupper($tag);
            }
        }
        $tags = array_unique($tags);
        sort($tags);
        return $tags;
    }
}
