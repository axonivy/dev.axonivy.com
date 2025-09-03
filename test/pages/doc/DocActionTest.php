<?php

namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DocActionTest extends TestCase
{
  public function testRenderVersion()
  {
    AppTester::assertThatGet('/doc/7.0')
      ->ok()
      ->bodyContains('Designer Guide')
      ->bodyContains('Engine Guide');
    AppTester::assertThatGet('/doc/7.0/en')
      ->ok()
      ->bodyContains('Designer Guide')
      ->bodyContains('Engine Guide');
  }

  public function testRedirectBugfixToMinor()
  {
    AppTester::assertThatGet('/doc/7.0.1')->redirect("/doc/7.0/en");
    AppTester::assertThatGet('/doc/7.0.1/en')->redirect("/doc/7.0/en");
  }

  public function testRedirectLatestToLTS()
  {
    AppTester::assertThatGet('/doc/latest')->redirect('/doc/8.0/en');
    AppTester::assertThatGet('/doc/latest/test.html')->redirect('/doc/8.0/en/test.html');
    AppTester::assertThatGet('/doc/latest/directory/test.html')->redirect('/doc/8.0/en/directory/test.html');
  }

  public function testRedirectMajorToLatestMinor()
  {
    AppTester::assertThatGet('/doc/8')->redirect('/doc/8.0/en');
    AppTester::assertThatGet('/doc/8/en')->redirect('/doc/8.0/en');
    AppTester::assertThatGet('/doc/7')->redirect('/doc/7.5/en');
    AppTester::assertThatGet('/doc/7/en')->redirect('/doc/7.5/en');
  }

  public function testRedirectMajorToLatestMinorWithFiles()
  {
    AppTester::assertThatGet('/doc/8/index.html')->redirect('/doc/8.0/en/index.html');
    AppTester::assertThatGet('/doc/8/en/index.html')->redirect('/doc/8.0/en/index.html');
    AppTester::assertThatGet('/doc/7/directory/another')->redirect('/doc/7.5/en/directory/another');
    AppTester::assertThatGet('/doc/7/en/directory/another')->redirect('/doc/7.5/en/directory/another');
  }

  public function testDoNotRedirectMinor()
  {
    AppTester::assertThatGet('/doc/8.0')->ok();
    AppTester::assertThatGet('/doc/8.0/en')->ok();
    AppTester::assertThatGet('/doc/7.0')->ok();
    AppTester::assertThatGet('/doc/7.0/en')->ok();
    AppTester::assertThatGet('/doc/2.0')->notFound();
  }

  public function testNonExistingDocVersions()
  {
    AppTester::assertThatGet('/doc/2.2.0')->notFound();
    AppTester::assertThatGet('/doc/7.0.0.0')->redirect("/doc/7.0/en");
    AppTester::assertThatGet('/doc/notexisting')->notFound();
  }

  public function testRedirectoMinorIfBugfixDoesNotExist()
  {
    AppTester::assertThatGet('/doc/9.1.0')->redirect('/doc/9.1/en');
    AppTester::assertThatGet('/doc/9.1.0/en')->redirect('/doc/9.1/en');
    AppTester::assertThatGet('/doc/9.1.99')->redirect('/doc/9.1/en');
    AppTester::assertThatGet('/doc/9.1.99/en')->redirect('/doc/9.1/en');
  }

  public function testRedirectToNewDocSinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0')->redirect("/doc/7.5/en");
    AppTester::assertThatGet('/doc/7.5.0/en')->redirect("/doc/7.5/en");
    AppTester::assertThatGet('/doc/9.1.0')->redirect('/doc/9.1/en');
    AppTester::assertThatGet('/doc/9.1.0/en')->redirect('/doc/9.1/en');
    AppTester::assertThatGet('/doc/dev')->redirect('/doc/9.4/en');
    AppTester::assertThatGet('/doc/dev/en')->redirect('/doc/9.4/en');
    AppTester::assertThatGet('/doc/sprint')->redirect('/doc/9.4/en');
    AppTester::assertThatGet('/doc/sprint/en')->redirect('/doc/9.4/en');
    AppTester::assertThatGet('/doc/nightly')->redirect('/doc/9.4/en');
    AppTester::assertThatGet('/doc/nightly/en')->redirect('/doc/9.4/en');
    AppTester::assertThatGet('/doc/nightly-8.0')->redirect('/doc/8.0/en');
    AppTester::assertThatGet('/doc/nightly-8.0/en')->redirect('/doc/8.0/en');

    AppTester::assertThatGet('/doc/latest')->redirect('/doc/8.0/en');
    AppTester::assertThatGet('/doc/latest/en')->redirect('/doc/8.0/en');
    AppTester::assertThatGet('/doc/2.0.0')->notFound();
    AppTester::assertThatGet('/doc/2.0.0/en')->notFound();
    AppTester::assertThatGet('/doc/notexisting')->notFound();
    AppTester::assertThatGet('/doc/notexisting/en')->notFound();
    AppTester::assertThatGet('/doc/nightly-7.0')->redirect('/doc/7.0/en');
    AppTester::assertThatGet('/doc/nightly-7.0/en')->redirect('/doc/7.0/en');
  }

  public function testRedirectMigrationNotesSinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0/migration-notes')->redirect("/doc/7.5/en/migration-notes");
    AppTester::assertThatGet('/doc/7.5.0/en/migration-notes')->redirect("/doc/7.5/en/migration-notes");
    AppTester::assertThatGet('/doc/9.1.0/migration-notes')->redirect('/doc/9.1/en/migration-notes');
    AppTester::assertThatGet('/doc/9.1.0/en/migration-notes')->redirect('/doc/9.1/en/migration-notes');
    AppTester::assertThatGet('/doc/dev/migration-notes')->redirect('/doc/9.4/en/migration-notes');
    AppTester::assertThatGet('/doc/dev/en/migration-notes')->redirect('/doc/9.4/en/migration-notes');
    AppTester::assertThatGet('/doc/sprint/migration-notes')->redirect('/doc/9.4/en/migration-notes');
    AppTester::assertThatGet('/doc/sprint/en/migration-notes')->redirect('/doc/9.4/en/migration-notes');
    AppTester::assertThatGet('/doc/nightly/migration-notes')->redirect('/doc/9.4/en/migration-notes');
    AppTester::assertThatGet('/doc/nightly/en/migration-notes')->redirect('/doc/9.4/en/migration-notes');
    AppTester::assertThatGet('/doc/nightly-8.0/migration-notes')->redirect('/doc/8.0/en/migration-notes');
    AppTester::assertThatGet('/doc/nightly-8.0/en/migration-notes')->redirect('/doc/8.0/en/migration-notes');

    AppTester::assertThatGet('/doc/latest/migration-notes')->redirect('/doc/8.0/en/migration-notes');
    AppTester::assertThatGet('/doc/latest/en/migration-notes')->redirect('/doc/8.0/en/migration-notes');
    AppTester::assertThatGet('/doc/2.0.0/migration-notes')->notFound();
    AppTester::assertThatGet('/doc/2.0.0/en/migration-notes')->notFound();
    AppTester::assertThatGet('/doc/notexisting/migration-notes')->notFound();
    AppTester::assertThatGet('/doc/notexisting/en/migration-notes')->notFound();
    AppTester::assertThatGet('/doc/nightly-7.0/migration-notes')->redirect('/doc/7.0/en/migration-notes');
    AppTester::assertThatGet('/doc/nightly-7.0/en/migration-notes')->redirect('/doc/7.0/en/migration-notes');
  }

  public function testRedirectReleaseNotesSinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0/release-notes')->redirect("/doc/7.5/en/release-notes");
    AppTester::assertThatGet('/doc/7.5.0/en/release-notes')->redirect("/doc/7.5/en/release-notes");
    AppTester::assertThatGet('/doc/9.1.0/release-notes')->redirect('/doc/9.1/en/release-notes');
    AppTester::assertThatGet('/doc/9.1.0/en/release-notes')->redirect('/doc/9.1/en/release-notes');
    AppTester::assertThatGet('/doc/dev/release-notes')->redirect('/doc/9.4/en/release-notes');
    AppTester::assertThatGet('/doc/dev/en/release-notes')->redirect('/doc/9.4/en/release-notes');
    AppTester::assertThatGet('/doc/sprint/release-notes')->redirect('/doc/9.4/en/release-notes');
    AppTester::assertThatGet('/doc/sprint/en/release-notes')->redirect('/doc/9.4/en/release-notes');
    AppTester::assertThatGet('/doc/nightly/release-notes')->redirect('/doc/9.4/en/release-notes');
    AppTester::assertThatGet('/doc/nightly/en/release-notes')->redirect('/doc/9.4/en/release-notes');
    AppTester::assertThatGet('/doc/nightly-8.0/release-notes')->redirect('/doc/8.0/en/release-notes');
    AppTester::assertThatGet('/doc/nightly-8.0/en/release-notes')->redirect('/doc/8.0/en/release-notes');

    AppTester::assertThatGet('/doc/latest/release-notes')->redirect('/doc/8.0/en/release-notes');
    AppTester::assertThatGet('/doc/latest/en/release-notes')->redirect('/doc/8.0/en/release-notes');
    AppTester::assertThatGet('/doc/2.0.0/release-notes')->notFound();
    AppTester::assertThatGet('/doc/2.0.0/en//release-notes')->notFound();
    AppTester::assertThatGet('/doc/notexisting/release-notes')->notFound();
    AppTester::assertThatGet('/doc/notexisting/en/release-notes')->notFound();
    AppTester::assertThatGet('/doc/nightly-7.0/release-notes')->redirect('/doc/7.0/en/release-notes');
    AppTester::assertThatGet('/doc/nightly-7.0/en/release-notes')->redirect('/doc/7.0/en/release-notes');
  }

  public function testRedirectNewAndNoteworthySinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0/new-and-noteworthy')->redirect("/doc/7.5/en/new-and-noteworthy");
    AppTester::assertThatGet('/doc/7.5.0/en/new-and-noteworthy')->redirect("/doc/7.5/en/new-and-noteworthy");
    AppTester::assertThatGet('/doc/9.1.0/new-and-noteworthy')->redirect('/doc/9.1/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/9.1.0/en/new-and-noteworthy')->redirect('/doc/9.1/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/9.1/new-and-noteworthy')->redirect('/news/9.1');
    AppTester::assertThatGet('/doc/9.1/en/new-and-noteworthy')->redirect('/news/9.1');
    AppTester::assertThatGet('/doc/dev/new-and-noteworthy')->redirect('/doc/9.4/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/dev/en/new-and-noteworthy')->redirect('/doc/9.4/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/sprint/new-and-noteworthy')->redirect('/doc/9.4/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/sprint/en/new-and-noteworthy')->redirect('/doc/9.4/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/nightly/new-and-noteworthy')->redirect('/doc/9.4/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/nightly/en/new-and-noteworthy')->redirect('/doc/9.4/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/nightly-8.0/new-and-noteworthy')->redirect('/doc/8.0/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/nightly-8.0/en/new-and-noteworthy')->redirect('/doc/8.0/en/new-and-noteworthy');

    AppTester::assertThatGet('/doc/latest/new-and-noteworthy')->redirect('/doc/8.0/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/latest/en/new-and-noteworthy')->redirect('/doc/8.0/en/new-and-noteworthy');
    AppTester::assertThatGet('/doc/2.0.0/new-and-noteworthy')->notFound();
    AppTester::assertThatGet('/doc/2.0.0/en/new-and-noteworthy')->notFound();
    AppTester::assertThatGet('/doc/notexisting/new-and-noteworthy')->notFound();
    AppTester::assertThatGet('/doc/notexisting/en/new-and-noteworthy')->notFound();
  }

  public function testRedirectAnyDocToLanguage() 
  {
    AppTester::assertThatGet('/doc/9.4/index.html')->redirect('/doc/9.4/en/index.html');
    AppTester::assertThatGet('/doc/9.4/gugus.html')->redirect('/doc/9.4/en/gugus.html');
    AppTester::assertThatGet('/doc/9.4/en/gugus.html')->notFound();
  }
}
