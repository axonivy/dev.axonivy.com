<?php
namespace test\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DocActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/doc/7.0.1')
            ->statusCode(200)
            ->bodyContains('Designer Guide')
            ->bodyContains('Engine Guide')
            ->bodyContains('Release Notes');   
    }
    
}