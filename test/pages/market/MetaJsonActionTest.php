<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MetaJsonActionTest extends TestCase
{

  public function testServeMetaJson()
  {
    AppTester::assertThatGet('/_market/doc-factory/_meta.json?version=8.0.1')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version": "8.0.1"');
  }

  public function testServeMetaJsonMissingVersion()
  {
    AppTester::assertThatGet('/_market/doc-factory/_meta.json')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version": "version-get-param-missing"');
  }
  
  public function testServeMetaJson_stableForDesigner()
  {
    AppTester::assertThatGet('/market/doc-factory/meta.json') // stable URI since Designer 9.2!
      ->ok()
      ->header('Content-Type', 'application/json');
  }

  public function testNotFound()
  {
    AppTester::assertThatGet('/_market/non-existing-product/_meta.json')
      ->notFound();
  }
}
