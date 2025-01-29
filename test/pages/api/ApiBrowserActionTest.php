<?php

namespace test\pages\api;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use test\AppTester;

class ApiBrowserActionTest extends TestCase
{
  
  public function testApiBrowser()
  {
    AppTester::assertThatGet('/api-browser')
      ->ok()
      ->bodyContains('#swagger-ui');
  }
  
  public function testApiBrowser_setup()
  {
    $swagger = __DIR__ . '/../../../src/web/swagger';
    Assert::assertFileExists($swagger . '/swagger-ui-bundle.js');
    Assert::assertFileExists($swagger . '/swagger-ui-standalone-preset.js');
    Assert::assertFileExists($swagger . '/swagger-ui.css');
    Assert::assertFileDoesNotExist($swagger . '/index.html', 
      "Do not distribute standard swagger with petstore");
    Assert::assertFileDoesNotExist($swagger . '/swagger-ui-bundle.js.map', 
      "Do not distribute bulky js.map resources");
  }
  
}
