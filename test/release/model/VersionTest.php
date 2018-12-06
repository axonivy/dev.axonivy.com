<?php
namespace test\release\model;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\release\model\Version;

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
    
    public function test_isLowerThan()
    {
        Assert::assertFalse((new Version('7.1.0'))->isLowerThan('7.0.0'));
        Assert::assertFalse((new Version('7.1.0'))->isLowerThan('7.0.9'));
        Assert::assertFalse((new Version('7.1.0'))->isLowerThan('7.1.0'));
        Assert::assertTrue((new Version('7.1.0'))->isLowerThan('7.2.0'));
    }
}