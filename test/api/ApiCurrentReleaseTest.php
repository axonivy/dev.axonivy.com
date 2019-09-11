<?php
namespace test\api;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ApiCurrentReleaseTest extends TestCase
{
    private static $RESPONSE = '{"latestReleaseVersion":"7.5.0","latestServiceReleaseVersion":"7.0.1"}';
    
    public function testCurrentRelease()
    {
        AppTester::assertThatGet('/api/currentRelease?releaseVersion=7.0.0')
            ->statusCode(200)
            ->bodyContains(self::$RESPONSE);
        
        AppTester::assertThatGet('/api/currentRelease?releaseVersion=6.6.0')
            ->statusCode(200)
            ->bodyContains(self::$RESPONSE);
    }
    
    public function testCurrentRelease_withInvalidVersionNumber()
    {
        AppTester::assertThatGet('/api/currentRelease?releaseVersion=xxx')
        ->statusCode(200)
        ->bodyContains(self::$RESPONSE);
        
        AppTester::assertThatGet('/api/currentRelease?releaseVersion=7')
        ->statusCode(200)
        ->bodyContains(self::$RESPONSE);
        
        AppTester::assertThatGet('/api/currentRelease?releaseVersion=7.')
        ->statusCode(200)
        ->bodyContains(self::$RESPONSE);
    }
    
    public function testCurrentRelease_withMissingReleaseVersion()
    {
        AppTester::assertThatGet('/api/currentRelease')
        ->statusCode(200)
        ->bodyContains(self::$RESPONSE);
    }
}