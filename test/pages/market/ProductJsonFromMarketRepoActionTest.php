<?php
namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ProductJsonFromMarketRepoActionTest extends TestCase
{

  public function testProductJson()
  {
    AppTester::assertThatGet('/_market/portal/_product.json?version=8.0.1')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version": "8.0.1"')
      ->bodyContains('"name": "Axon Ivy Portal"');
  }
  
  public function testProductJsonMissingVersion()
  {
    AppTester::assertThatGet('/_market/portal/_product.json')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version": "version-get-param-missing"');
  }

  public function testNotFound()
  {
    AppTester::assertThatGet('/_market/non-existing-product/_product.json')->notFound();
  }
}
