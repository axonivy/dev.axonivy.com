<?php

namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\ReleaseInfoRepository;

class DownloadActionTest extends TestCase
{

  public function testNightly()
  {
    AppTester::assertThatGet('/download/nightly')->ok()
      ->bodyContains('Nightly Build')
      ->bodyContains('https://download.axonivy.com/nightly/AxonIvyDesigner7.0.1.56047_Linux_x64.zip');
  }

  public function testNightly8()
  {
    AppTester::assertThatGet('/download/nightly-7')->ok()
      ->bodyContains('Nightly Build 7')
      ->bodyContains('https://download.axonivy.com/nightly-7/AxonIvyEngine7.5.0.56047_Windows_x64.zip');
  }

  public function testNightlyNonExisting()
  {
    AppTester::assertThatGet('/download/nightly-5')->notFound();
    AppTester::assertThatGet('/download/nightly-71')->notFound();
  }

  public function testSprint()
  {
    AppTester::assertThatGet('/download/sprint')->ok()
      ->bodyContains('Sprint Release')
      ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Windows_x64.zip');
  }

  public function testLegacySprintRedirect()
  {
    AppTester::assertThatGet('/download/sprint-release')->permanentRedirect('/download/sprint');
  }

  public function testLTS()
  {
    AppTester::assertThatGet('/download')->ok()
      ->bodyContains('Long Term Support')
      ->bodyContains('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip')
      ->bodyContains('24.12.2019');
  }
  
  public function testStrictVersion_LTS()
  {
    AppTester::assertThatGet('/download/8.0.1')->ok()
      ->bodyContains('Long Term Support')
      ->bodyContains('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip')
      ->bodyContains('24.12.2019');
  }
  
  
  public function testStrictVersion_LE()
  {
    AppTester::assertThatGet('/download/9.1.1')->ok()
      ->bodyContains('Leading Edge')
      ->bodyContains('https://download.axonivy.com/9.1.1/AxonIvyEngine9.1.1.96047_All_x64.zip');
  }
  
  public function testStrictVersion_NotExisting()
  {
    AppTester::assertThatGet('/download/7.9.59')->ok()
      ->bodyContains('currently not available');
  }

  public function testLeadingEdge()
  {
    $responseAssert = AppTester::assertThatGet('/download/leading-edge')->ok()->bodyContains('Leading Edge');

    $le = ReleaseInfoRepository::getLeadingEdge();
    if ($le != null)
    {
      $responseAssert->bodyContains("axonivy/axonivy-engine:" . $le->getVersion()->getBugfixVersion());
    }
  }

  public function testNotExisting()
  {
    AppTester::assertThatGet('/download/does-not-exist')->notFound();
  }
}
