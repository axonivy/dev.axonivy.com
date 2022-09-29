<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\market\Market;
use app\domain\util\StringUtil;

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

  public function testSonatypeArtifact()
  {
    AppTester::assertThatGet('/market/web-tester')
      ->ok()
      ->bodyContains('Web Tester');
  }

  public function testInstallButton_canNotInstallInOfficalMarket()
  {
    AppTester::assertThatGet('/market/genderize-io-connector')
      ->ok()
      ->bodyContains("Please open the");
  }

  public function testInstallButton_canInstallInDesignerMarket()
  {
    AppTester::assertThatGetWithCookie('http://localhost/market/genderize-io-connector', ['ivy-version' => '9.2.0'])
      ->ok()
      ->bodyContains("'http://localhost/_market/genderize-io-connector/_product.json?version=");
  }

  public function testInstallButton_byDefaultWithCurrentVersion()
  {
    $product = Market::getProductByKey('doc-factory');
    $version = $product->getMavenProductInfo()->getLatestVersionToDisplay();

    AppTester::assertThatGetWithCookie('http://localhost/market/doc-factory', ['ivy-version' => $version])
      ->ok()
      ->bodyContains("http://localhost/market-cache/doc-factory/doc-factory-product/$version/_product.json");
  }
  
  public function testInstallButton_respectCookie_ltsMatchInstaller()
  {
    $product = Market::getProductByKey('doc-factory');
    // grab latest minor version of doc factory
    $version = '';    
    foreach ($product->getMavenProductInfo()->getVersionsToDisplay() as $v)
    {
        if (StringUtil::startsWith($v, '9.4')) {
           $version = $v;
           break;
        }
    }
    AppTester::assertThatGetWithCookie('http://localhost/market/doc-factory', ['ivy-version' => '9.4.0'])
      ->ok()
      ->bodyContains("http://localhost/market-cache/doc-factory/doc-factory-product/$version/_product.json");
  }

  public function testInstallButton_respectCookie_bestMatchInstaller()
  {
      AppTester::assertThatGetWithCookie('http://localhost/market/portal', ['ivy-version' => '8.0.10'])
        ->ok()
        ->bodyContains("http://localhost/_market/portal/_product.json?version=8.0.10");
  }
  
  public function testInstallButton_respectCookie_bestMatchInstaller_ifNotExistUseLast()
  {
    $product = Market::getProductByKey('portal');
    $version = '';
    // grab latest minor version of doc factory
    foreach ($product->getMavenProductInfo()->getVersionsToDisplay() as $v)
    {
        if (StringUtil::startsWith($v, '8.0')) {
            $version = $v;
            break;
        }
    }
    AppTester::assertThatGetWithCookie('http://localhost/market/portal', ['ivy-version' => '8.0.99'])
      ->ok()
      ->bodyContains("http://localhost/_market/portal/_product.json?version=$version");
  }

  public function testInstallButton_useSpecificVersion()
  {
    AppTester::assertThatGetWithCookie('http://localhost/market/doc-factory/8.0.8', ['ivy-version' => '9.2.0'])
      ->ok()
      ->bodyContains("http://localhost/market-cache/doc-factory/doc-factory-product/8.0.8/_product.json");
  }

  public function testNotFoundWhenVersionDoesNotExistOfMavenBackedArtifact()
  {
    AppTester::assertThatGet('/market/basic-workflow-ui')->ok();
    AppTester::assertThatGet('/market/basic-workflow-ui/444')->notFound();
  }

  public function testNotFoundWhenVersionDoesNotExistOfNonMavenArtifact()
  {
    AppTester::assertThatGet('/market/genderize-io-connector')->ok();
    AppTester::assertThatGet('/market/genderize-io-connector/444')->notFound();
  }

  public function testAPIBrowserButton_exists()
  {
    AppTester::assertThatGet('market/genderize-io-connector')
      ->ok()
      ->bodyContains("/api-browser?url=/_market/genderize-io-connector/openapi");
  }

  public function testAPIBrowserButton_existsExtern()
  {
    AppTester::assertThatGet('market/uipath')
      ->ok()
      ->bodyContains("/api-browser?url=https%3A%2F%2Fcloud.uipath.com%2FAXONPRESALES%2FAXONPRESALES%2Fswagger%2Fv13.0%2Fswagger.json");
  }

  public function testAPIBrowserButton_existsForYaml()
  {
    AppTester::assertThatGet('market/amazon-lex')
      ->ok()
      ->bodyContains("/api-browser?url=/market-cache/amazon-lex/amazon-lex-connector-product");
  }

  public function testAPIBrowserButton_existsNot()
  {
    AppTester::assertThatGet('market/basic-workflow-ui')
      ->ok()
      ->bodyDoesNotContain("/api-browser?url");
  }
  
  public function testGetInTouchLink()
  {
    AppTester::assertThatGet('market/employee-onboarding')
      ->ok()
      ->bodyContains('a class="button special install" href="https://www.axonivy.com/marketplace/contact/?market_solutions=employee-onboarding');
  }
  
  public function testDontShowInstallCountForUninstallableProducts() 
  {
    AppTester::assertThatGet('market/employee-onboarding')
      ->ok()
      ->bodyDoesNotContain('Installations');
  }

  public function testDisplaySnapshotInVersionDropdown() 
  {
    AppTester::assertThatGet('market/doc-factory')
      ->ok()
      ->bodyContains('-SNAPSHOT</option>');
  }
  
  public function testShowBuildStatusBadge() 
  {
    AppTester::assertThatGet('market/excel-connector')
      ->ok()
      ->bodyContains('<img src="https://github.com/axonivy-market/excel-connector/actions/workflows/ci.yml/badge.svg" />');
  }

  public function testExternalVendor() 
  {
    AppTester::assertThatGet('market/jira-connector')
      ->ok()
      ->bodyContains('src="/_market/jira-connector/frox.png"')
      ->bodyContains('alt="FROX AG"')
      ->bodyContains('href="https://www.frox.ch"');

  }

  public function testVendor() 
  {
    AppTester::assertThatGet('market/visualvm-plugin')
      ->ok()
      ->bodyContains('src="/images/misc/axonivy-logo-black.svg"')
      ->bodyContains('alt="Axon Ivy AG"')      
      ->bodyContains('href="https://www.axonivy.com"');
  }
}
