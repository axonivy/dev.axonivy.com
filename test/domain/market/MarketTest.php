<?php
namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;

class MarketTest extends TestCase
{
    public function test_listed()
    {
        $products = Market::listed();
        foreach ($products as $product) {
            Assert::assertTrue($product->isListed());
        }
    }
}
