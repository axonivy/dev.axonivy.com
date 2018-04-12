<?php
namespace test\release;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use PHPUnit\Framework\Assert;

class StablePermalinksActionTest extends TestCase
{
    
    public function testPermalinks()
    {
        AppTester::assertThatGet('/download/stable/AxonIvyEngine-latest_Slim_All_x64.zip')
            ->statusCode(302)
            ->header('Location', 'https://download.axonivy.com/7.0.1/AxonIvyEngine7.0.1.56047_Slim_All_x64.zip');
    }
    
    public function testNotExistingPermalinks()
    {
        try {
            AppTester::assertThatGet('/download/stable/AxonIvyEngine-NotExistingType-x64.zip');
        } catch (\Slim\Exception\NotFoundException $e) {
           Assert::assertTrue(true);
           return;
        }
        Assert::fail('a not found exception should occur');
    }
    
}