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

    public function testInstallButton_notDisplayedInOfficalMarket()
    {
        AppTester::assertThatGet('/market/genderize')
            ->ok()
            ->bodyDoesNotContain('install(');
    }
    
    public function testInstallButton_displayInDesignerMarket()
    {
        AppTester::assertThatGetWithCookie('http://localhost/market/genderize', ['ivy-version' => '9.2.0'])
            ->ok()
            ->bodyContains("install('http://localhost/_market/genderize/meta.json')");
    }
    
    public function testInstallButton_displayInDesignerMarketShowWhyNotReason()
    {
        AppTester::assertThatGetWithCookie('/market/genderize', ['ivy-version' => '9.1.0'])
        ->ok()
        ->bodyContains("Your Axon.ivy Designer is too old (9.1.0). You need 9.2.0 or newer.");
    }
}
