<?php
namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DocOverviewActionTest extends TestCase
{
    public function testOverview()
    {
        AppTester::assertThatGet('/doc')
            ->ok()
            ->bodyContains('Leading Edge (LE)')
            ->bodyContains('Long Term Support (LTS)');
    }
}
