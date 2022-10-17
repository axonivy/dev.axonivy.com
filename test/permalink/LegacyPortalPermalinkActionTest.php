<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LegacyPortalPermalinkActionTest extends TestCase
{

  public function testPortal()
  {
    AppTester::assertThatGet('/portal')->redirect('https://market.axonivy.com/portal');
  }

  public function testPortalMinorVersion()
  {
    AppTester::assertThatGet('/portal/8.0')->redirect("https://market.axonivy.com/portal/8.0");
  }

  public function testPortalBugfixVersion()
  {
    AppTester::assertThatGet('/portal/8.0.3')->redirect("https://market.axonivy.com/portal/8.0.3");
  }

  public function testPortalDevReleases()
  {
    AppTester::assertThatGet('/portal/dev')->redirect("https://market.axonivy.com/portal/dev");
    AppTester::assertThatGet('/portal/sprint')->redirect("https://market.axonivy.com/portal/sprint");
    AppTester::assertThatGet('/portal/nightly')->redirect("https://market.axonivy.com/portal/nightly");
  }

  public function testPortalLatest()
  {
    AppTester::assertThatGet('/portal/latest')->redirect('https://market.axonivy.com/portal/latest');
  }

  public function testPortalDoc()
  {
    AppTester::assertThatGet('/portal/8.0.3/doc')->redirect('https://market.axonivy.com/portal/8.0.3/doc');
    AppTester::assertThatGet('/portal/8.0/doc')->redirect('https://market.axonivy.com/portal/8.0/doc');
  }

  public function testPortalDocWithDocument()
  {
    AppTester::assertThatGet('/portal/8.0.3/doc/test.html')->redirect('https://market.axonivy.com/portal/8.0.3/doc/test.html');
    AppTester::assertThatGet('/portal/8.0/doc/test.html')->redirect('https://market.axonivy.com/portal/8.0/doc/test.html');
  }

  public function testPortalDocWithDocumentInSubfolder()
  {
    AppTester::assertThatGet('/portal/8.0.3/doc/subfolder/test.html')->redirect('https://market.axonivy.com/portal/8.0.3/doc/subfolder/test.html');
    AppTester::assertThatGet('/portal/8.0/doc/subfolder/test.html')->redirect('https://market.axonivy.com/portal/8.0/doc/subfolder/test.html');
  }

  public function testPortalBrokenLink()
  {
    AppTester::assertThatGet('/portal/8.0/doc/portal-developer-guide/introduction/index.html#new-and-noteworthy')
      ->redirect('https://market.axonivy.com/portal/8.0/doc/portal-developer-guide/introduction/index.html');
  }
}
