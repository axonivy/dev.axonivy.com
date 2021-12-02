<?php
namespace test\pages\doc\redirect;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\market\Market;

class RedirectPortalGuideTest extends TestCase
{
  public function testPortalGuide()
  {
    AppTester::assertThatGet('/doc//portal-guide')->notFound();
    AppTester::assertThatGet('/doc/9.1.0/portal-guide')->redirect("/market-cache/portal/portal-guide/9.1.0");
    AppTester::assertThatGet('/doc/9.1.0/portal-guide/index.html')->redirect("/market-cache/portal/portal-guide/9.1.0/index.html");
    AppTester::assertThatGet('/doc/9.1.0/portal-guide/deep/deeper/index.html')->redirect("/market-cache/portal/portal-guide/9.1.0/deep/deeper/index.html");
  }
}
