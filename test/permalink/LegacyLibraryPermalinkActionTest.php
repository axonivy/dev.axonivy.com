<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LegacyLibraryPermalinkActionTest extends TestCase
{
  public function testPermalink_dev()
  {
    AppTester::assertThatGet('/permalink/lib/dev/demos.zip')
      ->redirect("https://market.axonivy.com/permalink/lib/dev/demos.zip");
  }

  public function testPermalink_specificVersion()
  {
    AppTester::assertThatGet('/permalink/lib/9.4.0-SNAPSHOT/demos.zip')
      ->redirect("https://market.axonivy.com/permalink/lib/9.4.0-SNAPSHOT/demos.zip");
  }

  public function testPermalink_minorVersion()
  {
    AppTester::assertThatGet('/permalink/lib/8.0/demos.zip')
      ->redirect("https://market.axonivy.com/permalink/lib/8.0/demos.zip");
  }
}
