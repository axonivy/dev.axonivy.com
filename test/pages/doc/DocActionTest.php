<?php

namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DocActionTest extends TestCase
{
  public function testRenderVersion()
  {
    AppTester::assertThatGet('/doc/7.0.1')
      ->ok()
      ->bodyContains('Designer Guide')
      ->bodyContains('Engine Guide');
  }

  public function testRedirectLatestToLTS()
  {
    AppTester::assertThatGet('/doc/latest')->redirect('/doc/8.0');
    AppTester::assertThatGet('/doc/latest/test.html')->redirect('/doc/8.0/test.html');
    AppTester::assertThatGet('/doc/latest/directory/test.html')->redirect('/doc/8.0/directory/test.html');
  }

  public function testRedirectMajorToLatestMinor()
  {
    AppTester::assertThatGet('/doc/8')->redirect('/doc/8.0');
    AppTester::assertThatGet('/doc/7')->redirect('/doc/7.5');
  }

  public function testRedirectMajorToLatestMinorWithFiles()
  {
    AppTester::assertThatGet('/doc/8/index.html')->redirect('/doc/8.0/index.html');
    AppTester::assertThatGet('/doc/7/directory/another')->redirect('/doc/7.5/directory/another');
  }

  public function testDoNotRedirectMinor()
  {
    AppTester::assertThatGet('/doc/8.0')->ok();
    AppTester::assertThatGet('/doc/7.0')->notFound();
  }

  public function testNonExistingDocVersions()
  {
    AppTester::assertThatGet('/doc/2.2.0')->notFound();
    AppTester::assertThatGet('/doc/7.0.0.0')->notFound();
    AppTester::assertThatGet('/doc/notexisting')->notFound();
  }

  public function testRedirectToNewDocSinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0')->ok();
    AppTester::assertThatGet('/doc/9.1.0')->redirect('/doc/9.1.0/index.html');
    AppTester::assertThatGet('/doc/dev')->redirect('/doc/dev/index.html');
    AppTester::assertThatGet('/doc/sprint')->redirect('/doc/sprint/index.html');
    AppTester::assertThatGet('/doc/nightly')->redirect('/doc/nightly/index.html');
    AppTester::assertThatGet('/doc/nightly-8.0')->redirect('/doc/nightly-8.0/index.html');

    AppTester::assertThatGet('/doc/latest')->redirect('/doc/8.0');
    AppTester::assertThatGet('/doc/2.0.0')->notFound();
    AppTester::assertThatGet('/doc/notexisting')->notFound();
    AppTester::assertThatGet('/doc/nightly-7.0')->ok();
  }

  public function testRedirectMigrationNotesSinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0/migration-notes')->ok();
    AppTester::assertThatGet('/doc/9.1.0/migration-notes')->redirect('/doc/9.1.0/axonivy/migration/index.html');
    AppTester::assertThatGet('/doc/dev/migration-notes')->redirect('/doc/dev/axonivy/migration/index.html');
    AppTester::assertThatGet('/doc/sprint/migration-notes')->redirect('/doc/sprint/axonivy/migration/index.html');
    AppTester::assertThatGet('/doc/nightly/migration-notes')->redirect('/doc/nightly/axonivy/migration/index.html');
    AppTester::assertThatGet('/doc/nightly-8.0/migration-notes')->redirect('/doc/nightly-8.0/axonivy/migration/index.html');

    AppTester::assertThatGet('/doc/latest/migration-notes')->redirect('/doc/8.0/migration-notes');
    AppTester::assertThatGet('/doc/2.0.0/migration-notes')->notFound();
    AppTester::assertThatGet('/doc/notexisting/migration-notes')->notFound();
    AppTester::assertThatGet('/doc/nightly-7.0/migration-notes')->ok();
  }

  public function testRedirectReleaseNotesSinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0/release-notes')->ok();
    AppTester::assertThatGet('/doc/9.1.0/release-notes')->redirect('/doc/9.1.0/axonivy/release-notes/index.html');
    AppTester::assertThatGet('/doc/dev/release-notes')->redirect('/doc/dev/axonivy/release-notes/index.html');
    AppTester::assertThatGet('/doc/sprint/release-notes')->redirect('/doc/sprint/axonivy/release-notes/index.html');
    AppTester::assertThatGet('/doc/nightly/release-notes')->redirect('/doc/nightly/axonivy/release-notes/index.html');
    AppTester::assertThatGet('/doc/nightly-8.0/release-notes')->redirect('/doc/nightly-8.0/axonivy/release-notes/index.html');

    AppTester::assertThatGet('/doc/latest/release-notes')->redirect('/doc/8.0/release-notes');
    AppTester::assertThatGet('/doc/2.0.0/release-notes')->notFound();
    AppTester::assertThatGet('/doc/notexisting/release-notes')->notFound();
    AppTester::assertThatGet('/doc/nightly-7.0/release-notes')->ok();
  }

  public function testRedirectNewAndNoteworthySinceVersion9()
  {
    AppTester::assertThatGet('/doc/7.5.0/new-and-noteworthy')->ok();
    AppTester::assertThatGet('/doc/9.1.0/new-and-noteworthy')->redirect('/news/9.1');
    AppTester::assertThatGet('/doc/dev/new-and-noteworthy')->redirect('/news');
    AppTester::assertThatGet('/doc/sprint/new-and-noteworthy')->redirect('/news');
    AppTester::assertThatGet('/doc/nightly/new-and-noteworthy')->redirect('/news');
    AppTester::assertThatGet('/doc/nightly-8.0/new-and-noteworthy')->redirect('/news');

    AppTester::assertThatGet('/doc/latest/new-and-noteworthy')->redirect('/doc/8.0/new-and-noteworthy');
    AppTester::assertThatGet('/doc/2.0.0/new-and-noteworthy')->notFound();
    AppTester::assertThatGet('/doc/notexisting/new-and-noteworthy')->notFound();
  }
}
