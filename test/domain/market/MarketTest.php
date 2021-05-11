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
    $products = Market::search(Market::listed(), '');
    Assert::assertEquals(9, count($products));
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

  public function test_searchInDescription()
  {
    $products = Market::search(Market::listed(), 'on-the-spot statistics');
    Assert::assertEquals(1, count($products));
    Assert::assertEquals('Portal', $products[0]->getName());
  }

  public function test_all_sort()
  {
    $products = Market::all();
    $sorts = array_map(fn (Product $p) => $p->getSort(), $products);
    $count  = count($sorts);

    for ($i = 0; $i < $count - 1; $i++) {
      Assert::assertGreaterThanOrEqual($sorts[$i], $sorts[$i + 1]);
    }
    Assert::assertEquals('portal', $products[0]->getKey());
  }

  public function test_types()
  {
    $types = Market::types();
    $expectedTypes = [
      new Type('All Types', '', 'si-types'), 
      new Type('Connectors', 'connector', 'si-connector'), 
      new Type('Process Model', 'process', 'si-diagram'),
      new Type('Solutions', 'solution', 'si-lab-flask'), 
      new Type('Utils', 'util', 'si-util')];
    Assert::assertEquals($expectedTypes, $types);
  }

  public function test_searchByType()
  {
    $products = Market::searchByType(Market::listed(), 'util');
    Assert::assertEquals(2, count($products));
    Assert::assertEquals('Portal', $products[0]->getName());
    Assert::assertEquals('VisualVM Plugin', $products[1]->getName());
  }

  public function test_tags()
  {
    $tags = Market::tags(Market::listed());
    $expectedTags = [
      'demo',
      'document',
      'helper',
      'hr',
      'monitoring',
      'office',
      'outlook',
      'rpa',
      'workflow-ui',
    ];
    Assert::assertEquals($expectedTags, $tags);
  }

  public function test_searchByTag()
  {
    $products = Market::searchByTag(Market::listed(), ['DEMO']);
    Assert::assertEquals(1, count($products));
    Assert::assertEquals('Demos', $products[0]->getName());
  }

  public function test_searchByMultipleTags()
  {
    $products = Market::searchByTag(Market::listed(), ['DEMO', 'WORKFLOW-UI']);
    Assert::assertEquals(2, count($products));
    Assert::assertEquals('Portal', $products[0]->getName());
    Assert::assertEquals('Demos', $products[1]->getName());
  }
}
