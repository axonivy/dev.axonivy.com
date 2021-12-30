<?php

namespace test\pages\github;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class GitHubActionTest extends TestCase
{
  public function testRender()
  {
    AppTester::assertThatGet('/github')
      ->ok()
      ->bodyContains('github.com/axonivy-market');
  }
}
