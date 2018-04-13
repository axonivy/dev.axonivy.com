<?php
namespace test\release;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class SprintReleaseActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/download/sprint-release')
            ->statusCode(200)
            ->bodyContains('Sprint Release')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Windows_x64.zip');
    }
    
    public function testRedirectToP2()
    {
        AppTester::assertThatGet('/download/sprint-release/p2')
        ->statusCode(302)
        ->header('Location', '/releases/ivy/sprint/p2');
    }
    
    public function testPermalinks()
    {
        AppTester::assertThatGet('/download/sprint-release/AxonIvyEngine-latest_Slim_All_x64.zip')
        ->statusCode(302)
        ->header('Location', 'https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip');
    }
    
    public function testNotExistingPermalinks()
    {
        $headerlocation = '/releases/ivy/sprint/AxonIvyEngine-latest_NotExistingArch.zip';
        
        AppTester::assertThatGet('/download/sprint-release/AxonIvyEngine-latest_NotExistingArch.zip')
            ->statusCode(302)
            ->header('Location', $headerlocation);
    }
    
    public function testAlsoAvailableUnderHtmlUrl()
    {
        $body1 = AppTester::assertThatGet('/download/sprint-release')->statusCode(200)->bodyContains('Sprint Release')->getBody();
        $body2 = AppTester::assertThatGet('/download/sprint-release.html')->statusCode(200)->bodyContains('Sprint Release')->getBody();
        self::assertEquals($body1, $body2);
    }
}