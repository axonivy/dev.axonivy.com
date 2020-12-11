<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class OpenApiJsonActionTest extends TestCase
{

  public function testServeOpenApiJson()
  {
    AppTester::assertThatGet('/_market/genderize/openapi')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"title": "Genderize"');
  }

  public function testNotFound()
  {
    AppTester::assertThatGet('/_market/non-existing-product/openapi')
      ->notFound();
  }
}
