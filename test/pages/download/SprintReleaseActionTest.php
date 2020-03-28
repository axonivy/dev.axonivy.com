<?php
namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class SprintReleaseActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/download/sprint')
            ->statusCode(200)
            ->bodyContains('Sprint Release')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Windows_x64.zip');
    }
    
    public function testRedirect()
    {
        AppTester::assertThatGet('/download/sprint-release')->permanentRedirect('/download/sprint');
    }
}