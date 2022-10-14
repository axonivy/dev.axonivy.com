<?php

namespace test\domain;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\ReleaseInfoRepository;

class ReleaseInfoRepositoryTest extends TestCase
{

  public function test_getLongTermSupportVersion()
  {
    Assert::assertNotNull(ReleaseInfoRepository::getLatestLongTermSupport());
  }

  public function test_getLongTermSupportVersions()
  {
      $lts = ReleaseInfoRepository::getLongTermSupportVersions();
      Assert::assertNotNull($lts);
      Assert::assertCount(2, $lts);
      foreach($lts as $version) {
          Assert::assertNotNull($version);
      }
  }

  public function test_getAllEverLongTermSupportVersions() 
  {
    $lts = ReleaseInfoRepository::getAllEverLongTermSupportVersions();
    Assert::assertNotNull($lts);
    Assert::assertNotEmpty($lts);
    foreach($lts as $version) {
      Assert::assertNotNull($version);
    }
  }

  public function test_getLeadingEdgesSinceLastLongTermVersion()
  {
    $le = ReleaseInfoRepository::getLeadingEdgesSinceLastLongTermVersion();
    Assert::assertNotNull($le);
    Assert::assertNotEmpty($le);
    foreach($le as $version) {
      Assert::assertNotNull($version);
    }
  }

  public function test_getNightlyMinorReleaseInfos()
  {
    $infos = ReleaseInfoRepository::getNightlyMinorReleaseInfos();
    Assert::assertNotNull($infos);
    Assert::assertNotEmpty($infos);
    foreach($infos as $info) {
      Assert::assertNotNull($info);
      Assert::assertStringStartsWith("nightly-", $info->getVersion()->getVersionNumber());
    }
  }

  public function test_getBestMatchingVersion()
  {
    Assert::assertEquals('8.0.0', self::bestMatchingVersion('8.0.0'));
    Assert::assertEquals('8.0.1', self::bestMatchingVersion('8.0.1'));

    Assert::assertEquals('8.0.1', self::bestMatchingVersion('8.0'));
    Assert::assertEquals('8.0.1', self::bestMatchingVersion('8'));

    Assert::assertEquals('dev', self::bestMatchingVersion('dev'));
    Assert::assertEquals('sprint', self::bestMatchingVersion('sprint'));
    Assert::assertEquals('nightly', self::bestMatchingVersion('nightly'));
    Assert::assertEquals('nightly-8.0', self::bestMatchingVersion('nightly-8.0'));

    Assert::assertNull(ReleaseInfoRepository::getBestMatchingVersion('2.0.0'));
    Assert::assertNull(ReleaseInfoRepository::getBestMatchingVersion('notexisting'));
  }

  private static function bestMatchingVersion(string $version): string
  {
    return ReleaseInfoRepository::getBestMatchingVersion($version)->getVersion()->getVersionNumber();
  }

  public function test_isReleased()
  {
    Assert::assertTrue(self::isReleased('8.0.0'));
    Assert::assertTrue(self::isReleased('8.0'));
    Assert::assertTrue(self::isReleased('8'));

    Assert::assertTrue(self::isReleased('dev'));
    Assert::assertTrue(self::isReleased('sprint'));
    Assert::assertTrue(self::isReleased('nightly'));

    Assert::assertFalse(self::isReleased('2.0.0'));
    Assert::assertFalse(self::isReleased('notexisting'));
  }

  private static function isReleased(string $version): bool
  {
    return ReleaseInfoRepository::isReleased($version);
  }
}
