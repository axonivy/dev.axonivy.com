<?php

namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\market\Market;

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

  public function testInstallButton_canNotInstallInOfficalMarket()
  {
    AppTester::assertThatGet('/market/genderize')
      ->ok()
      ->bodyDoesNotContain('install(')
      ->bodyContains("Please open the");
  }

  public function testInstallButton_canInstallInDesignerMarket()
  {
    AppTester::assertThatGetWithCookie('http://localhost/market/genderize', ['ivy-version' => '9.2.0'])
      ->ok()
      ->bodyContains("install('http://localhost/_market/genderize/_meta.json?version=')");
  }

  public function testInstallButton_displayInDesignerMarketShowWhyNotReason()
  {
    AppTester::assertThatGetWithCookie('/market/genderize', ['ivy-version' => '9.1.0'])
      ->ok()
      ->bodyContains("Your Axon.ivy Designer is too old (9.1.0). You need 9.2.0 or newer.");
  }

  public function testInstallButton_byDefaultWithCurrentVersion()
  {
    $product = Market::getProductByKey('doc-factory');
    $version = $product->getMavenProductInfo()->getLatestVersionToDisplay();

    AppTester::assertThatGetWithCookie('http://localhost/market/doc-factory', ['ivy-version' => '9.2.0'])
      ->ok()
      ->bodyContains("install('http://localhost/_market/doc-factory/_meta.json?version=$version')");
  }

  public function testInstallButton_useSpecificVersion()
  {
    AppTester::assertThatGetWithCookie('http://localhost/market/doc-factory/8.0.0', ['ivy-version' => '9.2.0'])
      ->ok()
      ->bodyContains("install('http://localhost/_market/doc-factory/_meta.json?version=8.0.0')");
  }

  public function testNotFoundWhenVersionDoesNotExistOfMavenBackedArtifact()
  {
    AppTester::assertThatGet('/market/basic-workflow-ui')->ok();
    AppTester::assertThatGet('/market/basic-workflow-ui/444')->notFound();
  }

  public function testNotFoundWhenVersionDoesNotExistOfNonMavenArtifact()
  {
    AppTester::assertThatGet('/market/genderize')->ok();
    AppTester::assertThatGet('/market/genderize/444')->notFound();
  }

  public function testAPIBrowserButton_exists()
  {
    AppTester::assertThatGet('market/genderize')
      ->ok()
      ->bodyContains("/api-browser?url=/_market/genderize/openapi");
  }

  public function testAPIBrowserButton_existsExtern()
  {
    AppTester::assertThatGet('market/uipath')
      ->ok()
      ->bodyContains("/api-browser?url=https://platform.uipath.com/AXONPRESALES/AXONPRESALES/swagger/v11.0/swagger.json");
  }

  public function testAPIBrowserButton_existsNot()
  {
    AppTester::assertThatGet('market/basic-workflow-ui')
      ->ok()
      ->bodyDoesNotContain("/api-browser?url");
  }
}
