<?php

namespace test\pages\support;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class SupportActionTest extends TestCase
{
  public function testRender()
  {
    AppTester::assertThatGet('/support')
      ->statusCode(200)
      ->bodyContains('Axon Ivy Support is committing to provide high-quality, technical support for quick problem solving, training or consulting.');
  }

  public function testOfficialSupportLinkProvidedByPeterHochstrasser()
  {
    AppTester::assertThatGet('/support')
      ->statusCode(200)
      ->bodyContains('<a href="https://support.axonivy.com">help center</a>');
  }
}
