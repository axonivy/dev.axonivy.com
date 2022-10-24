<?php

namespace test\pages\api;

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
  
}
