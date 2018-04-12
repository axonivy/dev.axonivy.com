<?php
namespace test\release;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use PHPUnit\Framework\Assert;

class SprintReleaseActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/download/sprint-release')
            ->statusCode(200)
            ->bodyContains('Sprint Release')
            ->bodyContains('https://d3ao4l46dir7t.cloudfront.net/ivy/sprint-release/Jakobshorn/7.1.0-S8/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip')
            ->bodyContains('https://d3ao4l46dir7t.cloudfront.net/ivy/sprint-release/Jakobshorn/7.1.0-S8/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip')
            ->bodyContains('https://d3ao4l46dir7t.cloudfront.net/ivy/sprint-release/Jakobshorn/7.1.0-S8/AxonIvyEngine7.0.1.56047.S8_Windows_x64.zip');
    }
    
    public function testRedirectToP2()
    {
        AppTester::assertThatGet('/download/sprint-release/p2')
        ->statusCode(302)
        ->header('Location', '/dev-releases/ivy/sprint-release/Jakobshorn/7.1.0-S8/p2');
    }
    
    public function testPermalinks()
    {
        AppTester::assertThatGet('/download/sprint-release/AxonIvyEngine-latest_Slim_All_x64.zip')
        ->statusCode(302)
        ->header('Location', '/dev-releases/ivy/sprint-release/Jakobshorn/7.1.0-S8/AxonIvyEngine7.0.1.56047.S8_Slim_All_x64.zip');
    }
    
    public function testNotExistingPermalinks()
    {
        try {
            AppTester::assertThatGet('/download/sprint-release/AxonIvyEngine-latest_NotExistingArch.zip');
        } catch (\Slim\Exception\NotFoundException $e) {
           Assert::assertTrue(true);
           return;
        }
        Assert::fail('a not found exception should occur');
    }
    
    public function testAlsoAvailableUnderHtmlUrl()
    {
        $body1 = AppTester::assertThatGet('/download/sprint-release')->statusCode(200)->bodyContains('Sprint Release')->getBody();
        $body2 = AppTester::assertThatGet('/download/sprint-release.html')->getBody();
        self::assertEquals($body1, $body2);
    }
}