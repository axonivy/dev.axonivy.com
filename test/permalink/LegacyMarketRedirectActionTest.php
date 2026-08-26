<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LegacyMarketRedirectActionTest extends TestCase
{

  public function testRoot()
  {
    AppTester::assertThatGet('/market')->redirect('https://market.axonivy.com');
  }

  public function testPortal()
  {
    AppTester::assertThatGet('/market/portal')->redirect('https://market.axonivy.com/portal');
  }

  public function testDeep()
  {
    AppTester::assertThatGet('/market/portal/8.0/doc')->redirect("https://market.axonivy.com/portal/8.0/doc");
  }
}
