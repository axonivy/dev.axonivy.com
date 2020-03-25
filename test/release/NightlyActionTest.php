<?php
namespace test\release;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class NightlyActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/download/nightly')
            ->statusCode(200)
            ->bodyContains('Nightly Build')
            ->bodyContains('https://download.axonivy.com/nightly/AxonIvyDesigner7.0.1.56047_Linux_x64.zip');
    }
}
