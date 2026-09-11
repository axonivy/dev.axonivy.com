<?php

namespace test\redirect;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class TutorialActionTest extends TestCase
{

  public function testRedirect()
  {
    AppTester::assertThatGet('/tutorial')
      ->redirect("https://www.axonivy.com/tutorials");
  }
}
