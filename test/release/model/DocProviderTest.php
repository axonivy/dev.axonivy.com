<?php
namespace test\release\model;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\release\model\doc\DocProvider;

class DocProviderTest extends TestCase
{

    public function testFindSecondLatestMinor()
    {
        $latestMinor = DocProvider::findSecondLatestMinor();
        Assert::assertEquals('7.0.latest', $latestMinor);
    }
}