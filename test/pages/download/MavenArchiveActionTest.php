<?php

namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MavenArchiveActionTest extends TestCase
{

  public function testRender()
  {
    AppTester::assertThatGet('/download/maven.html')
      ->ok()
      ->bodyContains('Axon Ivy Maven Engine Archive')
      ->bodyContains('Release 7.0.1')
      ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_All_x64.zip')
      ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip')
      ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Windows_x64.zip');
  }

  public function testDoesNotContainDesigner()
  {
    AppTester::assertThatGet('/download/maven.html')->ok()->bodyDoesNotContain('designer');
  }

  public function testDoesNotContainDocker()
  {
    AppTester::assertThatGet('/download/maven.html')->ok()->bodyDoesNotContain('docker');
  }

  public function testDoesNotContainDevReleases()
  {
    AppTester::assertThatGet('/download/maven.html')
      ->ok()
      ->bodyDoesNotContain('dev')
      ->bodyDoesNotContain('sprint');
  }

  public function testContainNightlyReleases()
  {
    AppTester::assertThatGet('/download/maven.html')
      ->ok()
      ->bodyContains('nightly')
      ->bodyContains('nightly-8.0')
      ->bodyContains('nightly-7.0');
  }

  public function testDoesNotVersionLowerThan6()
  {
    AppTester::assertThatGet('/download/maven.html')
      ->ok()
      ->bodyDoesNotContain('3.9.0');
  }
}
