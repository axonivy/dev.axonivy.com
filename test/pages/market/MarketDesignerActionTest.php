<?php
namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MarketDesignerActionTest extends TestCase
{
    
    public function testMarketPage()
    {
        AppTester::assertThatGet('/market-designer')
            ->ok()
            ->bodyContains('UI Path RPA')
            ->bodyDoesNotContain('VisualVM Plugin')
            ->bodyContains('Install') // install button
            ->bodyDoesNotContain("Team") // header
            ->bodyDoesNotContain("Support") // footer
            ->bodyDoesNotContain('Basic Workflow'); // not listed
    }
}
