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
  
  public function testMarketPage_querySearch()
  {
    AppTester::assertThatGet('/market?type=CONNECTOR&search=uipath')
      ->ok()
      ->bodyContains('uipath')
      ->bodyContains('id="main"');
  }
  
  public function testMarketPage_querySearchInstaller()
  {
      AppTester::assertThatGet('/market?type=CONNECTOR&search=uipath&installer=rest-client')
      ->ok()
      ->bodyContains('uipath')
      ->bodyContains('id="main"');
      
      AppTester::assertThatGet('/market?installer=maven-import')
      ->ok()
      ->bodyContains('doc-factory')
      ->bodyContains('portal')
      ->bodyDoesNotContain('uipath');
      
      AppTester::assertThatGet('/market?tags=document&installer=maven-import')
      ->ok()
      ->bodyContains('doc-factory')
      ->bodyDoesNotContain('portal');
  }
  
  public function testMarketPage_querySearchOnly()
  {
    AppTester::assertThatGet('/market?resultsOnly&type=CONNECTOR&search=uipath') // stable URI since Designer 9.2!
      ->ok()
      ->bodyContains('uipath')
      ->bodyDoesNotContain('id="main"'); // no search input!
  }
}
