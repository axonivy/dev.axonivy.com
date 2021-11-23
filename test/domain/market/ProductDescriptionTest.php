<?php
namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\ProductDescription;

class ProductDescriptionTest extends TestCase
{

  public function test_description()
  {
    $desc = self::desc('portal');
    Assert::assertStringContainsString('complete workflow user', $desc->getDescription());
    Assert::assertStringContainsString('<p>', $desc->getDescription());

    $desc = self::desc('ms-todo');
    Assert::assertStringNotContainsString('Follow the generic', $desc->getDescription());

    $desc = self::desc('uipath');
    Assert::assertStringNotContainsString('accelerate process', $desc->getDescription());
  }

  public function test_demoDescription()
  {
    $desc = self::desc('portal');
    Assert::assertEmpty('', $desc->getDemo());

    $desc = self::desc('ms-todo');
    Assert::assertEmpty('', $desc->getDemo());

    $desc = self::desc('uipath');
    Assert::assertStringContainsString('With this connector a demo process', $desc->getDemo());
  }

  public function test_setupDescription()
  {
    $desc = self::desc('portal');
    Assert::assertEmpty('', $desc->getSetup());
    
    $desc = self::desc('ms-todo');
    Assert::assertStringContainsString('Follow the generic', $desc->getSetup());
  }

  private function desc(string $productKey): ProductDescription
  {
    return ProductDescription::createByFile(__DIR__ . '/../../../src/web/_market/' . $productKey . '/README.md', 'http://localhost/assets');
  }
}
