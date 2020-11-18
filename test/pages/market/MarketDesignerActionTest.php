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
            ->bodyContains('VisualVM Plugin')
            ->bodyContains('Install') // install button
            ->bodyDoesNotContain("Team") // header
            ->bodyDoesNotContain("Support") // footer
            ->bodyDoesNotContain('Basic Workflow'); // not listed
    }

    public function testMarketPageSearchNonExisting()
    {
        AppTester::assertThatGet('/market-designer?search=notexisting')->ok()
            ->bodyDoesNotContain('UI Path RPA')
            ->bodyContains("No products found")
            ->bodyDoesNotContain('VisualVM Plugin');
    }

    public function testMarketPageSearch()
    {
        AppTester::assertThatGet('/market-designer?search=portal')->ok()
            ->bodyContains('Portal')
            ->bodyDoesNotContain('UI Path RPA')
            ->bodyDoesNotContain("No products found")
            ->bodyDoesNotContain('VisualVM Plugin');
    }

    public function testJavascriptInterfaceForDesignerAvailable()
    {
        AppTester::assertThatGet('/market-designer')
            ->ok()
            ->bodyContains('function enableInstallButtons(installers)')
            ->bodyContains('button special installbutton disabled can-not-install-product')
            ->bodyContains('button special installbutton disabled open-api-rest-client');
    }
}
