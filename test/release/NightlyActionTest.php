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
    
    public function testAlsoAvailableUnderHtmlUrl()
    {
        $body1 = AppTester::assertThatGet('/download/nightly')
            ->statusCode(200)
            ->bodyContains('Nightly Build')
            ->getBody();
        
        $body2 = AppTester::assertThatGet('/download/nightly.html')
            ->statusCode(200)
            ->bodyContains('Nightly Build')
            ->getBody();
        
        $body2 = str_replace('.html', '', $body2);
            
        self::assertEquals($body1, $body2);
    }
}