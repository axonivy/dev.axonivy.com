<?php
namespace test\api;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class StatusApiTest extends TestCase
{
    public function testStatus()
    {
        AppTester::assertThatGet('/status')
            ->statusCode(200)
            ->bodyContains('phpVersion')
            ->bodyContains('latestVersion')
            ->bodyContains('leadingEdgeVersion')
            ->bodyContains('latestLtsVersion');
    }
}
