<?php

namespace test\pages\github;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MarketRCPTTTest extends TestCase
{
  public function testRender()
  {
    AppTester::assertThatGet('/internal/market-rcptt?designerVersion=9.2.0')
      ->ok()
      ->bodyContains('runTest "https://fakehost/_market/portal/_meta.json?version=9.2.0"')
      ->bodyDoesNotContain('https://fakehost/_market/a-trust/_meta.json');
  }

  public function notFound()
  {
    AppTester::assertThatGet('/internal/market-rcptt')->notFound();
  }
}
