<?php

namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DocApiActionTest extends TestCase
{
  public function testApiBrowser()
  {
    AppTester::assertThatGet('/doc-api-browser')
      ->ok()
      ->bodyContains('/doc/dev/public-api/system.json');
  }
  
}
