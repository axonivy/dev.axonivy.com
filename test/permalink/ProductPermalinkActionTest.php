<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ProductPermalinkActionTest extends TestCase
{
  public function testPermalink_801()
  {
    AppTester::assertThatGet('/permalink/8.0.1/axonivy-engine.zip')->redirect('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip');
  }

  public function testPermalink_80()
  {
    AppTester::assertThatGet('/permalink/8.0/axonivy-engine.zip')->redirect('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip');
  }

  public function testPermalink_8()
  {
    AppTester::assertThatGet('/permalink/8/axonivy-engine.zip')->redirect('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip');
  }

  public function testPermalink_7()
  {
    AppTester::assertThatGet('/permalink/7/axonivy-engine.zip')->redirect('https://download.axonivy.com/7.5.0/AxonIvyEngine7.5.0.56047_All_x64.zip');
  }

  public function testPermalink_milestone()
  {
    AppTester::assertThatGet('/permalink/milestone/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/milestone/AxonIvyEngine7.0.1.56047.m8_Slim_All_x64.zip');
  }

  public function testPermalink_milestone_m8()
  {
    AppTester::assertThatGet('/permalink/14.0.0-m8/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/14.0.0-m8/AxonIvyEngine7.0.1.56047.m8_Slim_All_x64.zip');
  }

  public function testPermalink_sprint_redirects_to_milestone()
  {
    AppTester::assertThatGet('/permalink/sprint/axonivy-engine-slim.zip')->redirect('/permalink/milestone/axonivy-engine-slim.zip');
  }

  public function testPermalink_sprint_notexisting_redirects_to_milestone()
  {
    AppTester::assertThatGet('/permalink/sprint/axonivy-engine-NotExistingType.zip')->redirect('/permalink/milestone/axonivy-engine-NotExistingType.zip');
  }

  public function testPermalink_milestone_notexisting()
  {
    AppTester::assertThatGet('/permalink/milestone/axonivy-engine-NotExistingType.zip')->notFound();
  }

  public function testPermalink_nightly()
  {
    AppTester::assertThatGet('/permalink/nightly/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/nightly/AxonIvyEngine14.0.0.2602191030_Slim_All_x64.zip');
  }

  public function testPermalink_nightly8()
  {
    AppTester::assertThatGet('/permalink/nightly-8.0/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/nightly-8.0/AxonIvyEngine8.0.1.96047_Slim_All_x64.zip');
  }

  public function testPermalink_nightly_notexisting()
  {
    AppTester::assertThatGet('/permalink/nightly/axonivy-engineNotExisting-Slim_All.zip')->notFound();
  }

  public function testPermalink_latest()
  {
    AppTester::assertThatGet('/permalink/latest/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_Slim_All_x64.zip');
  }

  public function testPermalink_latest_notexisting()
  {
    AppTester::assertThatGet('/permalink/latest/AxonIvyEngine-NotExistingType-x64.zip')->notFound();
  }
}
