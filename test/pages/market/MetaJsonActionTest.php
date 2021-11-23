<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MetaJsonActionTest extends TestCase
{

  public function testServeMetaJson()
  {
    AppTester::assertThatGet('/_market/portal/_product.json?version=8.0.1')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version":"8.0.1"');
  }

  public function testServeMetaJsonMissingVersion()
  {
    AppTester::assertThatGet('/_market/portal/_product.json')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version":"version-get-param-missing"');
  }
  
  public function testServeMetaJson_stableForDesigner()
  {
    AppTester::assertThatGet('/market/portal/meta.json') // stable URI since Designer 9.2!
      ->redirect('/_market/portal/_meta.json'); 
      // link to real location: for resolving logo.png and other artifacts.
  }

  public function testNotFound()
  {
    AppTester::assertThatGet('/_market/non-existing-product/_product.json')
      ->notFound();
  }
}
