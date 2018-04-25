<?php
namespace test\release\model;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\release\model\DocProvider;

class DocProviderTest extends TestCase
{

    public function testFindLatestMinor()
    {
        $latestMinor = DocProvider::findLatestMinor();
        Assert::assertEquals('7.1.latest', $latestMinor);
    }
}