<?php

namespace test\pages\tutorial;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class TutorialActionTest extends TestCase
{

  public function testRender()
  {
    AppTester::assertThatGet('/tutorial')
      ->redirect("https://www.axonivy.com/tutorials");
  }
}
