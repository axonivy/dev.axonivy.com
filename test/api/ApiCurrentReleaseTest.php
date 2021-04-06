<?php

namespace test\api;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\ReleaseInfoRepository;

class ApiCurrentReleaseTest extends TestCase
{
  public function testCurrentRelease()
  {
    AppTester::assertThatGet('/api/currentRelease?releaseVersion=7.0.0')
      ->statusCode(200)
      ->bodyContains(self::response());

    AppTester::assertThatGet('/api/currentRelease?releaseVersion=6.6.0')
      ->statusCode(200)
      ->bodyContains(self::responseNewest());
  }

  public function testCurrentRelease_withInvalidVersionNumber()
  {
    AppTester::assertThatGet('/api/currentRelease?releaseVersion=xxx')
      ->statusCode(200)
      ->bodyContains(self::responseNewest());

    AppTester::assertThatGet('/api/currentRelease?releaseVersion=7')
      ->statusCode(200)
      ->bodyContains(self::response());

    AppTester::assertThatGet('/api/currentRelease?releaseVersion=7.')
      ->statusCode(200)
      ->bodyContains(self::response());
  }

  public function testCurrentRelease_withMissingReleaseVersion()
  {
    AppTester::assertThatGet('/api/currentRelease')
      ->statusCode(200)
      ->bodyContains(self::responseNewest());
  }
  
  private static function response(): string
  {
     return '{"latestReleaseVersion":"'. self::currentRelease() .'","latestServiceReleaseVersion":"7.0.1"}';
  }
  
  private static function responseNewest(): string
  {
      return '{"latestReleaseVersion":"'. self::currentRelease() .'","latestServiceReleaseVersion":"8.0.1"}';
  }
  
  private static function currentRelease(): string
  {
    return ReleaseInfoRepository::getLatest()->getVersion()->getBugfixVersion();
  }
}
