<?php
namespace test\release;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class PermalinkActionTest extends TestCase
{
    public function testPermalink_sprint()
    {
        AppTester::assertThatGet('/permalink/sprint/axonivy-engine-slim.zip')
            ->statusCode(302)
            ->header('Location', 'https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip');
    }
    
    public function testPermalink_sprint_notexisting()
    {
        AppTester::assertThatGetThrowsNotFoundException('/permalink/sprint/axonivy-engine-NotExistingType.zip');
    }
    
    public function testPermalink_nightly()
    {
        AppTester::assertThatGet('/permalink/nightly/axonivy-engine-slim.zip')
        ->statusCode(302)
        ->header('Location', 'https://download.axonivy.com/nightly/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip');
    }
    
    public function testPermalink_nightly_notexisting()
    {
        AppTester::assertThatGetThrowsNotFoundException('/permalink/nightly/axonivy-engineNotExisting-Slim_All.zip');
    }
    
    public function testPermalink_latest()
    {
        AppTester::assertThatGet('/permalink/latest/axonivy-engine-slim.zip')
        ->statusCode(302)
        ->header('Location', 'https://download.axonivy.com/latest/AxonIvyEngine7.2.0.56047_Slim_All_x64.zip');
    }
    
    public function testPermalink_latest_notexisting()
    {
        AppTester::assertThatGetThrowsNotFoundException('/permalink/latest/AxonIvyEngine-NotExistingType-x64.zip');
    }
    
}