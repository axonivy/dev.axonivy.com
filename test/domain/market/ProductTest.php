<?php

namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\market\MarketInstallCounter;
use app\Config;

class ProductTest extends TestCase
{

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

  public function test_vendor()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('Axon Ivy AG', $product->getVendor());

    $product = Market::getProductByKey('jira-connector');
    Assert::assertEquals('FROX AG', $product->getVendor());
  }

  public function test_vendorImage()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('/images/misc/axonivy-logo-black.svg', $product->getVendorImage());

    $product = Market::getProductByKey('jira-connector');
    Assert::assertEquals('/_market/jira-connector/frox.png', $product->getVendorImage());
  }

  public function test_vendorUrl()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('https://www.axonivy.com', $product->getVendorUrl());

    $product = Market::getProductByKey('jira-connector');
    Assert::assertEquals('https://www.frox.ch', $product->getVendorUrl());
  }

  public function test_metaUrl()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('/_market/visualvm-plugin/_product.json?version=9.1', $product->getProductJsonUrl('9.1'));
  }

  public function test_installable()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertFalse($product->isInstallable($product->getVersion()[0]));

    $product = Market::getProductByKey('uipath');
    Assert::assertTrue($product->isInstallable($product->getVersion()[0]));
  }

  public function test_compatibility()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('7.0+', $product->getCompatibility());

    $product = Market::getProductByKey('genderize-io-connector');
    Assert::assertEquals('9.2+', $product->getCompatibility());
  }

  public function test_getReasonWhyNotInstallable()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('VisualVM Plugin in version 9.2.0 is not installable.', $product->getReasonWhyNotInstallable(true, '9.2.0'));

    $product = Market::getProductByKey('genderize-io-connector');
    Assert::assertEquals('', $product->getReasonWhyNotInstallable(true, '9.2.0'));
    Assert::assertEquals('', $product->getReasonWhyNotInstallable(true, '9.3.0'));
  }

  public function test_type()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('util', $product->getType());

    $product = Market::getProductByKey('demos-app');
    Assert::assertEquals('solution', $product->getType());

    $product = Market::getProductByKey('ms-todo');
    Assert::assertEquals('connector', $product->getType());
  }

  public function test_tags()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals(['monitoring'], $product->getTags());

    $product = Market::getProductByKey('ms-todo');
    Assert::assertEquals(['office'], $product->getTags());

    $product = Market::getProductByKey('demos-app');
    Assert::assertEquals(['demo'], $product->getTags());
  }
  
  public function test_firstTag()
  {
    $product = Market::getProductByKey('visualvm-plugin');
    Assert::assertEquals('monitoring', $product->getFirstTag());
  }

  public function test_meta()
  {
    $product = Market::getProductByKey('ms-todo');
    Assert::assertEquals('Axon Ivy AG', $product->getVendor());
    Assert::assertEquals('Free', $product->getCost());
    Assert::assertEquals('https://github.com/axonivy/market', $product->getSourceUrl());
    Assert::assertEquals('github.com', $product->getSourceUrlDomain());
    Assert::assertEquals('English', $product->getLanguage());
    Assert::assertEquals('Cross-Industry', $product->getIndustry());
    Assert::assertEquals('4.5', $product->getPlatformReview());
    Assert::assertEquals('1.0', $product->getVersion());
  }

  public function test_load_version_from_maven()
  {
    $product = Market::getProductByKey('a-trust');
    Assert::assertNotEquals('1.0', $product->getVersion());
    Assert::assertNotEmpty($product->getVersion());
  }

  public function test_load_compatibilty_from_maven()
  {
    $product = Market::getProductByKey('a-trust');
    Assert::assertNotEquals('1.0', $product->getCompatibility());
    Assert::assertNotEmpty($product->getCompatibility());
  }

  public function test_installationCount()
  {
    $product = Market::getProductByKey('ms-todo');
    $count = $product->getInstallationCount();
    Assert::assertIsInt($count);
    Assert::assertGreaterThanOrEqual(20, $count);
    Assert::assertLessThanOrEqual(1000, $count);
    MarketInstallCounter::incrementInstallCount('ms-todo');
    //cached value
    Assert::assertEquals($count, $product->getInstallationCount());
    //reload with incremented value
    $product = Market::getProductByKey('ms-todo');
    Assert::assertEquals($count + 1, $product->getInstallationCount());
  }
}
