<?php
namespace test\team;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class TeamActionTest extends TestCase
{

    public function testRender()
    {
        AppTester::assertThatGet('/team')
            ->statusCode(200)
            ->bodyContains('ivyTeam is the core development team of the Axon.ivy Digital Business Platform.');
    }

    public function testRender_brunoExists()
    {
        AppTester::assertThatGet('/team')
            ->statusCode(200)
            ->bodyContains('Bruno Bütler')
            ->bodyContains('/images/team/bruno.jpg')
            ->bodyContains('Inf. Ing. HTL')
            ->bodyContains('Product Owner &amp; Team Leader');
    }
}