<?php
namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MarketActionTest extends TestCase
{
    
    public function testMarketPage()
    {
        AppTester::assertThatGet('/market')
            ->ok()
            ->bodyContains('Portal')
            ->bodyContains('VisualVM Plugin')
            ->bodyDoesNotContain('Basic Workflow'); // not listed
    }
}
