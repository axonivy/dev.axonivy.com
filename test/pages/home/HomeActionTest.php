<?php
namespace test\pages\team;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class HomeActionTest extends TestCase
{

  public function testRender()
  {
    AppTester::assertThatGet('/')
      ->statusCode(200)
      ->bodyContains('Engine Listing Service')
      ->bodyContains("master")
      ->bodyContains("AxonIvyEngine")
      ->bodyContains("AxonIvyDesigner")
      ->bodyContains("zip")
      ->bodyContains("This service is provided by one of your teammates");
  }
}
