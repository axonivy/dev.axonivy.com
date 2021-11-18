<?php
namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\market\MarketInstallCounter;
use app\Config;
use app\domain\market\ProductDescription;

class ProductDescriptionTest extends TestCase
{

  public function test_description()
  {
    $desc = self::desc('visualvm-plugin');
    Assert::assertStringContainsString('The Axon Ivy VisualVM plugin enables real-time monitoring of an Axon Ivy Engine', $desc->getDescription());
    Assert::assertStringContainsString('<p>', $desc->getDescription());

    $desc = self::desc('ms-todo');
    Assert::assertStringNotContainsString('Follow the generic', $desc->getDescription());

    $desc = self::desc('doc-factory');
    Assert::assertStringNotContainsString('Demo part', $desc->getDescription());
  }

  public function test_demoDescription()
  {
    $desc = self::desc('visualvm-plugin');
    Assert::assertEmpty('', $desc->getDemo());

    $desc = self::desc('ms-todo');
    Assert::assertEmpty('', $desc->getDemo());

    $desc = self::desc('web-tester');
    Assert::assertStringContainsString('To see how you can use this util please', $desc->getDemo());
  }

  public function test_setupDescription()
  {
    $desc = self::desc('visualvm-plugin');
    Assert::assertEmpty('', $desc->getSetup());
    
    $desc = self::desc('ms-todo');
    Assert::assertStringContainsString('Follow the generic', $desc->getSetup());
  }

  private function desc(string $productKey): ProductDescription
  {
    return ProductDescription::createByFile(__DIR__ . '/../../../src/web/_market/' . $productKey . '/README.md', 'http://localhost/assets');
  }
}
