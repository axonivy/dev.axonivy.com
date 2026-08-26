<?php

namespace test\pages\permalink;

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
