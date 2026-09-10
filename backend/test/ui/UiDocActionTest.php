<?php

namespace test\ui;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class UiDocActionTest extends TestCase
{
  public function testDoc()
  {
    AppTester::assertThatGet('/ui/doc')
      ->ok()
      ->bodyContains('docLinksLTS')
      ->bodyContains('docLinksLE')
      ->bodyContains('docLinksDev"')
      ->bodyContains('Migration Notes')
      ->bodyContains('Release Notes');
  }
}
