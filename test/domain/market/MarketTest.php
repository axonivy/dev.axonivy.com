<?php

namespace test\domain\market;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\market\Market;
use app\domain\market\Type;
use app\domain\market\Product;

class MarketTest extends TestCase
{

  public function test_listed()
  {
    $products = Market::listed();
    Assert::assertGreaterThanOrEqual(1, count($products));
    foreach ($products as $product) {
      Assert::assertTrue($product->isListed());
    }
  }

  public function test_getProductByKey()
  {
    $portal = Market::getProductByKey('portal');
    Assert::assertEquals('portal', $portal->getKey());
  }

  public function test_getProductByKey_nonExisting()
  {
    $product = Market::getProductByKey('non-existing');
    Assert::assertNull($product);
  }

  public function test_getProductByKey_notListed()
  {
    $product = Market::getProductByKey('basic-workflow-ui');
    Assert::assertFalse($product->isListed());
  }

  public function test_search_emptyDoNotFilter()
  {
    $products = Market::search(Market::all(), '');
    
    $path = __DIR__ . '/../../../src/web/_market';
    $total_items  = count(glob("$path/*", GLOB_ONLYDIR));
    Assert::assertEquals($total_items, count($products));
  }

  public function test_search_noMatch()
  {
    $products = Market::search(Market::listed(), 'thisdoesnotexistatall');
    Assert::assertEquals(0, count($products));
  }

  public function test_searchInName()
  {
    $products = Market::search(Market::listed(), 'visual');
    Assert::assertEquals(1, count($products));
    Assert::assertEquals('VisualVM Plugin', $products[0]->getName());
  }

  public function test_searchInShortDescription()
  {
    $products = Market::search(Market::listed(), 'single point of contact');
    Assert::assertEquals(1, count($products));
    Assert::assertEquals('Axon Ivy Portal', $products[0]->getName());
  }

  public function test_all_sort()
  {
    $products = Market::all();
    Assert::assertEquals('a-trust', $products[0]->getKey());
  }

  public function test_types()
  {
    $types = Market::types();
    $expectedTypes = [
      new Type('All Types', '', 'si-types'), 
      new Type('Connectors', 'connector', 'si-connector'), 
      //new Type('Process Models', 'process', 'si-diagram'),
      new Type('Solutions', 'solution', 'si-lab-flask'), 
      new Type('Utils', 'util', 'si-util')];
    Assert::assertEquals($expectedTypes, $types);
  }

  public function test_searchByType()
  {
    $products = Market::searchByType(Market::listed(), 'util');
    $keys = array_map(fn(Product $p) => $p->getKey(), $products);
    Assert::assertContains('portal', $keys);
    Assert::assertContains('visualvm-plugin', $keys);
  }

  public function test_tags()
  {
    $tags = Market::tags(Market::listed());
    Assert::assertContains('AI', $tags);
    Assert::assertContains('HELPER', $tags);
    Assert::assertContains('LOCATION', $tags);
    Assert::assertContains('SOCIAL', $tags);
  }

  public function test_searchByTag()
  {
    $products = Market::searchByTag(Market::listed(), ['DEMO']);
    $keys = array_map(fn(Product $p) => $p->getKey(), $products);
    Assert::assertContains('connectivity-demo', $keys);
  }

  public function test_searchByMultipleTags()
  {
    $products = Market::searchByTag(Market::listed(), ['DEMO', 'WORKFLOW-UI']);
    $keys = array_map(fn(Product $p) => $p->getKey(), $products);
    Assert::assertContains('connectivity-demo', $keys);
    Assert::assertContains('portal', $keys);
  }
}
