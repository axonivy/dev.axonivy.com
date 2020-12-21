<?php

namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ApiBrowserActionTest extends TestCase
{
  public function testApiBrowser()
  {
    AppTester::assertThatGet('/api-browser')
      ->ok()
      ->bodyContains('/doc/dev/openapi/system.json');
  }
  
}
