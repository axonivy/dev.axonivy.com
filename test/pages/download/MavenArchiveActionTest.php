<?php
namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MavenArchiveActionTest extends TestCase
{

    public function testRender()
    {
        AppTester::assertThatGet('/download/maven.html')
            ->ok()
            ->bodyContains('Axon.ivy Maven Engine Archive')
            ->bodyContains('Release 7.0.1')
            ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip')
            ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Windows_x64.zip');
    }

    public function testDoesNotContainDesigner()
    {
        AppTester::assertThatGet('/download/maven.html')->ok()->bodyDoesNotContain('designer');
    }

    public function testDoesNotContainDebian()
    {
        AppTester::assertThatGet('/download/maven.html')->ok()->bodyDoesNotContain('deb');
    }
    
    public function testDoesNotContainDocker()
    {
        AppTester::assertThatGet('/download/maven.html')->ok()->bodyDoesNotContain('docker');
    }
    
    public function testDoesNotContainDevReleases()
    {
        AppTester::assertThatGet('/download/maven.html')
            ->ok()
            ->bodyDoesNotContain('dev')
            ->bodyDoesNotContain('sprint')
            ->bodyDoesNotContain('nightly')
            ->bodyDoesNotContain('nightly-8')
            ->bodyDoesNotContain('nightly-7');
    }
    
    public function testDoesNotVersionLowerThan6()
    {
        AppTester::assertThatGet('/download/maven.html')
            ->ok()
            ->bodyDoesNotContain('3.9.0');
    }
}
