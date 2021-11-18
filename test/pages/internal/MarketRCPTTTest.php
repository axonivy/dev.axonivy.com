<?php

namespace test\pages\github;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MarketRCPTTTest extends TestCase
{
  public function testRender()
  {
    $_SERVER['HTTPS'] = 'https';
    $_SERVER['HTTP_HOST'] = 'fakehost';
    
    AppTester::assertThatGet('/internal/market-rcptt?designerVersion=9.2.0')
      ->ok()
      ->bodyContains('runTest "https://fakehost/_market/doc-factory/_product.json?version=9.2')
      ->bodyDoesNotContain('https://fakehost/_market/a-trust/_product.json');
  }

  public function notFound()
  {
    AppTester::assertThatGet('/internal/market-rcptt')->notFound();
  }
}
