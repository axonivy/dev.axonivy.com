<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\market\Market;

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

  public function testNotFound()
  {
    AppTester::assertThatGet('/_market/non-existing-product/_meta.json')
      ->notFound();
  }
}
