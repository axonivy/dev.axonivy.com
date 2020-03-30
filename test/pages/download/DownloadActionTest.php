<?php
namespace test\pages\download;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DownloadActionTest extends TestCase
{

    public function testNightly()
    {
        AppTester::assertThatGet('/download/nightly')->ok()
            ->bodyContains('Nightly Build')
            ->bodyContains('https://download.axonivy.com/nightly/AxonIvyDesigner7.0.1.56047_Linux_x64.zip');
    }

    public function testSprint()
    {
        AppTester::assertThatGet('/download/sprint')->ok()
            ->bodyContains('Sprint Release')
            ->bodyContains('https://download.axonivy.com/sprint/AxonIvyEngine7.0.1.56047.S8_Windows_x64.zip');
    }

    public function testLegacySprintRedirect()
    {
        AppTester::assertThatGet('/download/sprint-release')->permanentRedirect('/download/sprint');
    }

    public function testLTS()
    {
        AppTester::assertThatGet('/download')->ok()
            ->bodyContains('Long Term Support')
            ->bodyContains('https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip');
    }

    public function testLeadingEdge()
    {
        AppTester::assertThatGet('/download/leading-edge')->ok()
            ->bodyContains('Leading Edge')
            ->bodyContains('https://download.axonivy.com/9.1.1/AxonIvyDesigner9.1.0.96047_MacOSX-BETA_x64.zip');
    }

    public function testNotExisting()
    {
        AppTester::assertThatGet('/download/does-not-exist')->notFound();
    }
}
