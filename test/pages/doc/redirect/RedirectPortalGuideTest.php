<?php
namespace test\pages\doc\redirect;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class RedirectPortalGuideTest extends TestCase
{
  public function testPortalGuide()
  {
    AppTester::assertThatGet('/doc//portal-guide')->notFound();
    AppTester::assertThatGet('/doc/9.1.0/portal-guide')->redirect("https://market.axonivy.com/portal/9.1.0/doc");
    AppTester::assertThatGet('/doc/9.1.0/portal-guide/index.html')->redirect("https://market.axonivy.com/portal/9.1.0/doc/index.html");
    AppTester::assertThatGet('/doc/9.1.0/portal-guide/deep/deeper/index.html')->redirect("https://market.axonivy.com/portal/9.1.0/doc/deep/deeper/index.html");
    AppTester::assertThatGet('/doc/9.1.0/en/portal-guide')->redirect("https://market.axonivy.com/portal/9.1.0/doc");
    AppTester::assertThatGet('/doc/9.1.0/en/portal-guide/index.html')->redirect("https://market.axonivy.com/portal/9.1.0/doc/index.html");
    AppTester::assertThatGet('/doc/9.1.0/jp/portal-guide/deep/deeper/index.html')->redirect("https://market.axonivy.com/portal/9.1.0/doc/deep/deeper/index.html");
  }
}
