<?php

namespace test\domain;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\Version;

class VersionTest extends TestCase
{

  public function test_getMajorVersion()
  {
    Assert::assertEquals('7', (new Version('7.1.0'))->getMajorVersion());
    Assert::assertEquals('7', (new Version('7.1'))->getMajorVersion());
    Assert::assertEquals('7', (new Version('7'))->getMajorVersion());

    Assert::assertEquals('10', (new Version('10.1.0'))->getMajorVersion());
  }

  public function test_getMinorNumber()
  {
    Assert::assertEquals('1', (new Version('7.1.0'))->getMinorNumber());
    Assert::assertEquals('1', (new Version('7.1'))->getMinorNumber());
    Assert::assertEquals('', (new Version('7'))->getMinorNumber());

    Assert::assertEquals('0', (new Version('7.0.0'))->getMinorNumber());

    Assert::assertEquals('10', (new Version('7.10.0'))->getMinorNumber());
  }

  public function test_isMinor()
  {
    Assert::assertFalse((new Version('7.1.0'))->isMinor());
    Assert::assertFalse((new Version('7'))->isMinor());

    Assert::assertTrue((new Version('7.0'))->isMinor());
    Assert::assertTrue((new Version('11.0'))->isMinor());
    Assert::assertTrue((new Version('7.19'))->isMinor());
  }

  public function test_getNightlyMinorVersion()
  {
    Assert::assertEquals('7.0', (new Version('nightly-7.0'))->getNightlyMinorVersion());
    Assert::assertEquals('8.0', (new Version('nightly-8.0'))->getNightlyMinorVersion());
    Assert::assertEquals('', (new Version('nightly'))->getNightlyMinorVersion());
  }
}
