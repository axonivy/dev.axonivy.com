<?php

namespace test\domain\util;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Assert;
use app\domain\util\StringUtil;

class StringUtilTest extends TestCase
{
  public function testContainsIgnoreCase()
  {
    Assert::assertTrue(StringUtil::containsIgnoreCase('abc', 'abc'));
    Assert::assertTrue(StringUtil::containsIgnoreCase('abc', 'ab'));
    Assert::assertFalse(StringUtil::containsIgnoreCase('abc', 'd'));
    Assert::assertTrue(StringUtil::containsIgnoreCase('ABC', 'abc'));
  }
}
