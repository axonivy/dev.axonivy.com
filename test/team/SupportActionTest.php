<?php
namespace test\support;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class TeamActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/team')
            ->statusCode(200)
            ->bodyContains('ivyTeam is the core development team of the Axon.ivy Digital Business Platform.')
            ->bodyContains('Bruno Bütler');
    }
    
}