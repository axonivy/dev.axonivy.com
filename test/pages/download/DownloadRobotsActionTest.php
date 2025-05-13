<?php

namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DownloadRobotsActionTest extends TestCase
{

  public function testRobotsTxt()
  {
    AppTester::assertThatGet('/download/robots.txt')->ok()
      ->bodyContains('User-agent: *')
      ->bodyContains('Disallow: /');
  }
}
