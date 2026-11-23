<?php

namespace test\redirect;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DownloadVersionRedirectActionTest extends TestCase
{
  public function testDownloadVersionRedirectsToDownload()
  {
    AppTester::assertThatGet('/download/12.0.9')->redirect('/download');
    AppTester::assertThatGet('/download/13.1.0-m1')->redirect('/download');
    AppTester::assertThatGet('/download/latest')->redirect('/download');
  }

  public function testDownloadStaticRoutesAreNotRedirected()
  {
    AppTester::assertThatGet('/download/robots.txt')->ok()->bodyContains('Disallow');
  }
}
