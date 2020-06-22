<?php
namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\market\Product;

class ProductTest extends TestCase
{

    public function test_description()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertStringContainsString('The Axon.ivy VisualVM plugin enables real-time monitoring of an Axon.ivy Engine for', $product->getDescription());
        Assert::assertStringContainsString('<p>', $product->getDescription());
    }
    
    public function test_listed()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertTrue($product->isListed());
        
        $product = Market::getProductByKey('basic-workflow-ui');
        Assert::assertFalse($product->isListed());
    }
    
    public function test_name()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals('VisualVM Plugin', $product->getName());
    }
    
    public function test_sort()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals(200, $product->getSort());
    }
    
    public function test_url()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals('/market/visualvm-plugin', $product->getUrl());
    }
    
    public function test_importWizard()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertFalse($product->getImportWizard());
        
        $product = Market::getProductByKey('basic-workflow-ui');
        Assert::assertTrue($product->getImportWizard());
    }
}
