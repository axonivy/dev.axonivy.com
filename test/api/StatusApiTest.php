<?php

namespace test\api;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class StatusApiTest extends TestCase
{
  public function testStatus()
  {
    AppTester::assertThatGet('/api/status')
      ->statusCode(200)
      ->bodyContains('phpVersion')
      ->bodyContains('latestVersion')
      ->bodyContains('leadingEdgeVersion')
      ->bodyContains('latestLtsVersion')
      ->bodyContains('market')
      ->bodyContains('Doc Factory');
  }
}
