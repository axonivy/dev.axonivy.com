<?php
namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class ProductActionTest extends TestCase
{
    
    public function testBasicWorkflowUi()
    {
        AppTester::assertThatGet('/market/basic-workflow-ui')
            ->ok()
            ->bodyContains('Basic Workflow UI');
    }

    public function testPortal()
    {
        AppTester::assertThatGet('/market/portal')
            ->ok()
            ->bodyContains('Portal');
    }
}
