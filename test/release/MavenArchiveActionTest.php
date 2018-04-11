<?php
namespace test\support;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MavenArchiveActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/download/maven.html')
            ->statusCode(200)
            ->bodyContains('Axon.ivy Maven Engine Archive')
            ->bodyContains('Release 7.0.1')
            ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Windows_x64.zip');
    }
    
}