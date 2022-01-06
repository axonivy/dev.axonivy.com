<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class OpenApiActionTest extends TestCase
{

  public function testServeOpenApiJson()
  {
    AppTester::assertThatGet('/_market/genderize-io-connector/openapi')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"title": "Genderize"');
  }

  public function testServeOpenApiYaml()
  {
    AppTester::assertThatGet('/_market/amazon-lex/openapi')
      ->ok()
      ->header('Content-Type', 'text/plain')
      ->bodyContains('openapi: 3.0.0');
  }

  public function testServeOpenApiJson_externalOpenApiUrl()
  {
    AppTester::assertThatGet('/_market/uipath/openapi')
      ->notFound();
  }

  public function testNotFound()
  {
    AppTester::assertThatGet('/_market/non-existing-product/openapi')
      ->notFound();
  }
}
