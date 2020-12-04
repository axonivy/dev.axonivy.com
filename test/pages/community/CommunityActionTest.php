<?php

namespace test\pages\community;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class CommunityActionTest extends TestCase
{

  public function testRender()
  {
    AppTester::assertThatGet('/community')
      ->statusCode(200)
      ->bodyContains('on GitHub.');
  }
}
