<?php
namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ArchiveActionTest extends TestCase
{

    public function testArchiveByDefaultLTS()
    {
        AppTester::assertThatGet('/download/archive')->ok()
            ->bodyContains('Archive')
            ->bodyContains('https://download.axonivy.com/8.0.0/AxonIvyDesigner8.0.0.56047_Linux_x64.zip')
            ->bodyDoesNotContain('7.0.1');
    }
    
    public function testArchive80()
    {
        AppTester::assertThatGet('/download/archive/8.0')->ok()
        ->bodyContains('https://download.axonivy.com/8.0.0/AxonIvyDesigner8.0.0.56047_Linux_x64.zip')
        ->bodyDoesNotContain('7.0.1');
    }
    
    public function testArchive70()
    {
        AppTester::assertThatGet('/download/archive/7.0')->ok()
        ->bodyContains('https://download.axonivy.com/7.0.1/AxonIvyDesigner7.0.1.56047_Linux_x64.zip')
        ->bodyDoesNotContain('7.2')
        ->bodyDoesNotContain('3.9.9');
    }
    
    public function testArchive7x()
    {
        AppTester::assertThatGet('/download/archive/7.x')->ok()
        ->bodyContains('https://download.axonivy.com/7.2.0/AxonIvyDesigner7.2.0.56047_Linux_x64.zip')
        ->bodyDoesNotContain('7.0.1')
        ->bodyDoesNotContain('3.9.9');
    }
    
    public function testDropdown()
    {
        AppTester::assertThatGet('/download/archive/7.x')->ok()
        ->bodyContains('8.0 (Long Term Support)')
        ->bodyContains('9 (Leading Edge)')
        ->bodyContains('6.0 (UNSUPPORTED)')
        ->bodyContains('unstable')
        ->bodyDoesNotContain('sprint')
        ->bodyDoesNotContain('nightly');
    }
    
    public function testUnstable()
    {
        AppTester::assertThatGet('/download/archive/unstable')->ok()
            ->bodyContains('sprint')
            ->bodyContains('nightly')
            ->bodyContains('nightly-8')
            ->bodyContains('nightly-7');
    }
}
