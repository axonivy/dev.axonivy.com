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
    
    public function test_metaUrl()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals('/_market/visualvm-plugin/_meta.json?version=9.1', $product->getMetaUrl('9.1'));
    }
    
    public function test_metaJson()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertStringContainsString('"id": "visualvm-plugin"', $product->getMetaJson());
    }
    
    public function test_installable()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertFalse($product->isInstallable());
        
        $product = Market::getProductByKey('uipath');
        Assert::assertTrue($product->isInstallable());
    }
    
    public function test_minVersion()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals('0.0.0', $product->getMinVersion());
        
        $product = Market::getProductByKey('genderize');
        Assert::assertEquals('9.2.0', $product->getMinVersion());
    }
    
    public function test_isVersionSupported()
    {
        $product = Market::getProductByKey('genderize');
        Assert::assertEquals('9.2.0', $product->getMinVersion());

        Assert::assertTrue($product->isVersionSupported('9.2.0'));
        Assert::assertTrue($product->isVersionSupported('9.2.1'));
        Assert::assertTrue($product->isVersionSupported('9.3.0'));
        Assert::assertTrue($product->isVersionSupported('10.0.0'));
        
        Assert::assertFalse($product->isVersionSupported('9.1.0'));
        Assert::assertFalse($product->isVersionSupported('9.1.5'));
        Assert::assertFalse($product->isVersionSupported('9.0.0'));
        Assert::assertFalse($product->isVersionSupported('8.6.0'));
    }
    
    public function test_getReasonWhyNotInstallable()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals('Product is not installable.', $product->getReasonWhyNotInstallable('9.2.0'));
        
        $product = Market::getProductByKey('genderize');
        Assert::assertEquals('', $product->getReasonWhyNotInstallable('9.2.0'));
        Assert::assertEquals('', $product->getReasonWhyNotInstallable('9.3.0'));
        Assert::assertEquals('Your Axon.ivy Designer is too old (9.1.0). You need 9.2.0 or newer.', $product->getReasonWhyNotInstallable('9.1.0'));
    }

    public function test_tags()
    {
        $product = Market::getProductByKey('visualvm-plugin');
        Assert::assertEquals(['monitoring'], $product->getTags());
        
        $product = Market::getProductByKey('uipath');
        Assert::assertEquals(['connector', 'RPA'], $product->getTags());
        
        $product = Market::getProductByKey('demos');
        Assert::assertEquals(['demo'], $product->getTags());
    }
}
