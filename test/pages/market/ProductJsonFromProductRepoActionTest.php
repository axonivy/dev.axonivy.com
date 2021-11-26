<?php
namespace test\pages\market;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\market\ProductMavenArtifactDownloader;
use app\domain\market\Market;

class ProductJsonFromProductRepoActionTest extends TestCase
{

  public function testProductJson()
  {
    $product = Market::getProductByKey('doc-factory');    
    (new ProductMavenArtifactDownloader())->download($product, '9.2.0');
    
    AppTester::assertThatGet('/market-cache/doc-factory/doc-factory-product/9.2.0/_product.json')
      ->ok()
      ->header('Content-Type', 'application/json')
      ->bodyContains('"version": "9.2.0"')
      ->bodyContains('"name":"DocFactory"');
  }

  public function testNotFound()
  {
    $product = Market::getProductByKey('doc-factory');
    (new ProductMavenArtifactDownloader())->download($product, '9.2.0');

    AppTester::assertThatGet('/market-cache/non-existing-product/doc-factory-product/9.2.0/_product.json')
      ->notFound()
      ->bodyContains("product does not exist");
    AppTester::assertThatGet('/market-cache/doc-factory/doc-factory-product/non-existing-version/_product.json')
      ->notFound()
      ->bodyContains("version does not exist");
  }
}
