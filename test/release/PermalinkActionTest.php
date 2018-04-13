<?php
namespace test\release;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class PermalinkActionTest extends TestCase
{
    public function testPermalink_sprint()
    {
        AppTester::assertThatGet('/permalink/ivy/sprint/AxonIvyEngine-latest_Slim_All_x64.zip')
            ->statusCode(302)
            ->header('Location', 'https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip');
    }
    
    public function testPermalink_nightly()
    {
        AppTester::assertThatGet('/permalink/ivy/nightly/AxonIvyEngine-latest_Slim_All_x64.zip')
        ->statusCode(302)
        ->header('Location', 'https://download.axonivy.com/nightly/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip');
    }
}