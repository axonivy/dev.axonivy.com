<?php
namespace test\util;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Assert;
use app\util\StringUtil;

class StringUtilTest extends TestCase
{
    
    public function testStartsWith()
    {
        Assert::assertTrue(StringUtil::startsWith('abc', 'abc'));
        Assert::assertTrue(StringUtil::startsWith('abc', 'ab'));
        Assert::assertTrue(StringUtil::startsWith('abc', 'a'));
        Assert::assertTrue(StringUtil::startsWith('!abc', '!abc'));
        Assert::assertTrue(StringUtil::startsWith('', ''));
        Assert::assertTrue(StringUtil::startsWith(null, null));
    }
    
    public function testStartsNotWith()
    {
        Assert::assertFalse(StringUtil::startsWith('abc', 'bc'));
        Assert::assertFalse(StringUtil::startsWith('abc', 'c'));
    }
    
    public function testEndsWith()
    {
        Assert::assertTrue(StringUtil::endsWith('abc', 'abc'));
        Assert::assertTrue(StringUtil::endsWith('abc', 'bc'));
        Assert::assertTrue(StringUtil::endsWith('abc', 'c'));
        Assert::assertTrue(StringUtil::endsWith('!abc', '!abc'));
        Assert::assertTrue(StringUtil::endsWith('', ''));
        Assert::assertTrue(StringUtil::endsWith(null, null));
    }
    
    public function testEndsNotWith()
    {
        Assert::assertFalse(StringUtil::endsWith('abc', 'ab'));
        Assert::assertFalse(StringUtil::endsWith('abc', 'a'));
    }
    
    public function testNotEqual()
    {
        Assert::assertTrue(StringUtil::notEqual('abc', 'ab'));
        Assert::assertTrue(StringUtil::notEqual('abc', 'a'));
        Assert::assertTrue(StringUtil::notEqual('', 'a'));
        Assert::assertTrue(StringUtil::notEqual('abc', ''));
        Assert::assertTrue(StringUtil::notEqual('abc', null));
        Assert::assertTrue(StringUtil::notEqual(null, 'a'));
        
        Assert::assertFalse(StringUtil::notEqual('abc', 'abc'));
        Assert::assertFalse(StringUtil::notEqual('', ''));
        Assert::assertFalse(StringUtil::notEqual(null, null));
    }
    
    public function testIsFirstCharacterNumeric()
    {
        Assert::assertFalse(StringUtil::isFirstCharacterNumeric('abc'));
        Assert::assertFalse(StringUtil::isFirstCharacterNumeric('a'));
        Assert::assertFalse(StringUtil::isFirstCharacterNumeric('a3a'));
        Assert::assertFalse(StringUtil::isFirstCharacterNumeric(''));
        Assert::assertFalse(StringUtil::isFirstCharacterNumeric(null));
        Assert::assertTrue(StringUtil::isFirstCharacterNumeric('2abc'));
        Assert::assertTrue(StringUtil::isFirstCharacterNumeric('2'));
        Assert::assertTrue(StringUtil::isFirstCharacterNumeric(2));
    }
}
