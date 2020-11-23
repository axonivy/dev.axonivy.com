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
    
    public function testMarketPageSearch()
    {
        AppTester::assertThatGet('/market?search=portal')
        ->ok()
        ->bodyContains('Portal')
        ->bodyDoesNotContain('No products found')
        ->bodyDoesNotContain('VisualVM Plugin')
        ->bodyDoesNotContain('Basic Workflow'); // not listed
    }
    
    public function testMarketPageSearchNothingFound()
    {
        AppTester::assertThatGet('/market?search=doesnotexist')
        ->ok()
        ->bodyContains('Nothing found')
        ->bodyDoesNotContain('Portal')
        ->bodyDoesNotContain('VisualVM Plugin')
        ->bodyDoesNotContain('Basic Workflow'); // not listed
    }
}
