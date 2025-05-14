<?php

namespace test\pages;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class NotFoundTest extends TestCase
{

  public function testRender()
  {
    AppTester::assertThatGet('/404')
      ->statusCode(404)
      ->bodyContains('Process start not found');
  }

  public function testRender_tutorialSignalExists()
  {
    AppTester::assertThatGetWithUserAgent('/404', 'Amazon CloudFront')
      ->statusCode(404)
      ->bodyDoesNotContain('Process start not found');
  }
}
