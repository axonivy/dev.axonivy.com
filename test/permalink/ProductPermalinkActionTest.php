<?php
namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ProductPermalinkActionTest extends TestCase
{
    public function testPermalink_801()
    {
        AppTester::assertThatGet('/permalink/8.0.1/axonivy-engine.deb')->redirect('https://download.axonivy.com/8.0.1/axonivy-engine-8x_8.0.1.96047.deb');
    }
    
    public function testPermalink_80()
    {
        AppTester::assertThatGet('/permalink/8.0/axonivy-engine.deb')->redirect('https://download.axonivy.com/8.0.1/axonivy-engine-8x_8.0.1.96047.deb');
    }
    
    public function testPermalink_8()
    {
        AppTester::assertThatGet('/permalink/8/axonivy-engine.deb')->redirect('https://download.axonivy.com/8.0.1/axonivy-engine-8x_8.0.1.96047.deb');
    }
    
    public function testPermalink_7()
    {
        AppTester::assertThatGet('/permalink/7/axonivy-engine.zip')->redirect('https://download.axonivy.com/7.5.0/AxonIvyEngine7.5.0.56047_All_x64.zip');
    }
    
    public function testPermalink_sprint()
    {
        AppTester::assertThatGet('/permalink/sprint/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip');
    }
    
    public function testPermalink_sprint_notexisting()
    {
        AppTester::assertThatGet('/permalink/sprint/axonivy-engine-NotExistingType.zip')->notFound();
    }
    
    public function testPermalink_nightly()
    {
        AppTester::assertThatGet('/permalink/nightly/axonivy-engine-slim.zip')->redirect('https://download.axonivy.com/nightly/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip');
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