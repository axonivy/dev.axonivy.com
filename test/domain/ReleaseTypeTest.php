<?php
namespace test\domain;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\ReleaseType;

class ReleaseTypeTest extends TestCase
{

    public function test_byKey()
    {
        Assert::assertEquals('dev', ReleaseType::byKey('dev')->key());
        Assert::assertEquals('sprint', ReleaseType::byKey('sprint')->key());
        Assert::assertEquals('nightly', ReleaseType::byKey('nightly')->key());
        Assert::assertEquals('lts', ReleaseType::byKey('lts')->key());
        Assert::assertEquals('leading-edge', ReleaseType::byKey('leading-edge')->key());
        
        Assert::assertNull(ReleaseType::byKey('no-existing'));
        Assert::assertNull(ReleaseType::byKey(''));
    }
    
    public function test_devReleaseInfo()
    {
         Assert::assertEquals('dev', ReleaseType::DEV()->releaseInfo()->getVersion()->getVersionNumber());
         Assert::assertEquals('nightly', ReleaseType::NIGHTLY()->releaseInfo()->getVersion()->getVersionNumber());
         Assert::assertEquals('sprint', ReleaseType::SPRINT()->releaseInfo()->getVersion()->getVersionNumber());
         
         Assert::assertEquals('nightly-8', ReleaseType::byKey('nightly-8')->key());
         Assert::assertEquals('nightly-7', ReleaseType::byKey('nightly-7')->key());
    }
    
    public function test_allReleaseInfos()
    {
        Assert::assertEquals(2, count(ReleaseType::LTS()->allReleaseInfos()));
        Assert::assertEquals(1, count(ReleaseType::LE()->allReleaseInfos()));
    }
    
    public function test_byArchiveKey()
    {
        Assert::assertEquals(5, count(ReleaseType::byArchiveKey('unstable')));
        Assert::assertEquals(1, count(ReleaseType::byArchiveKey('lts')));
    }
}
