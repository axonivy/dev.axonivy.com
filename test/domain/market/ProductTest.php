<?php

namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\market\MarketInstallCounter;
use app\domain\market\Product;

class ProductTest extends TestCase
{

  public function test_description()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertStringContainsString('The Axon Ivy VisualVM plugin enables real-time monitoring of an Axon Ivy Engine for', $product->getDescription());
    Assert::assertStringContainsString('<p>', $product->getDescription());

    $product2 = Market::getProductByKey('toDo');
    Assert::assertStringNotContainsString('Follow the generic', $product2->getDescription());

    $product3 = Market::getProductByKey('doc-factory');
    Assert::assertStringNotContainsString('Demo part', $product3->getDescription());
  }

  public function test_demoDescription()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEmpty('', $product->getDemoDescription());

    $product2 = Market::getProductByKey('toDo');
    Assert::assertEmpty('', $product2->getDemoDescription());

    $product3 = Market::getProductByKey('doc-factory');
    Assert::assertStringContainsString('Demo part', $product3->getDemoDescription());
  }

  public function test_setupDescription()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEmpty('', $product->getSetupDescription());
    
    $product2 = Market::getProductByKey('toDo');
    Assert::assertStringContainsString('Follow the generic', $product2->getSetupDescription());

    $product3 = Market::getProductByKey('doc-factory');
    Assert::assertStringContainsString('You can use the import wizard', $product3->getSetupDescription());
  }

  public function test_shortDescription()
  {
    $product = Market::getProductByKey('demos');
    Assert::assertStringContainsString('A collection of demos, with some simple explanations of you can solve things.', $product->getShortDescription());
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
  
  public function test_metaJson_includes()
  {
    $product = Market::getProductByKey('ms365');
    Assert::assertStringContainsString('"id": "msgraph"', $product->getMetaJson());
    
    $product = Market::getProductByKey('toDo');
    Assert::assertStringContainsString('"id": "ms-todo"', $product->getMetaJson());
  }

  public function test_installable()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertFalse($product->isInstallable());

    $product = Market::getProductByKey('uipath');
    Assert::assertTrue($product->isInstallable());
  }

  public function test_compatibility()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('0.0.0', $product->getCompatibility());

    $product = Market::getProductByKey('genderize');
    Assert::assertEquals('9.2+', $product->getCompatibility());
  }

  public function test_isVersionSupported()
  {
    $product = Market::getProductByKey('genderize');
    Assert::assertEquals('9.2+', $product->getCompatibility());

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
    Assert::assertEquals('Your Axon Ivy Designer is too old (9.1.0). You need version 9.2+.', $product->getReasonWhyNotInstallable('9.1.0'));
  }

  public function test_type()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('util', $product->getType());

    $product = Market::getProductByKey('demos');
    Assert::assertEquals('solution', $product->getType());

    $product = Market::getProductByKey('toDo');
    Assert::assertEquals('connector', $product->getType());
  }

  public function test_tags()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals(['monitoring'], $product->getTags());

    $product = Market::getProductByKey('toDo');
    Assert::assertEquals(['office', 'outlook'], $product->getTags());

    $product = Market::getProductByKey('demos');
    Assert::assertEquals(['demo'], $product->getTags());
  }

  public function test_meta()
  {
    $product = Market::getProductByKey('toDo');
    Assert::assertEquals('Axon Ivy AG', $product->getVendor());
    Assert::assertEquals('free', $product->getCosts());
    Assert::assertEquals('https://github.com/axonivy/market', $product->getSourceUrl());
    Assert::assertEquals('github.com', $product->getSourceUrlDomain());
    Assert::assertEquals('en', $product->getLanguage());
    Assert::assertEquals('Cross-Industry', $product->getIndustry());
    Assert::assertEquals('4.5', $product->getPlatformReview());
    Assert::assertEquals('1.0', $product->getVersion());
  }

  public function test_installationCount()
  {
    $product = Market::getProductByKey('toDo');
    $count = $product->getInstallationCount();
    Assert::assertIsInt($count);
    Assert::assertTrue($count >= 20 && $count <= 50);
    MarketInstallCounter::incrementInstallCount('toDo');
    //cached value
    Assert::assertEquals($count, $product->getInstallationCount());
    //reload with incremented value
    $product = Market::getProductByKey('toDo');
    Assert::assertEquals($count + 1, $product->getInstallationCount());
  }
}
