<?php

namespace test\domain;

use app\domain\doc\DocProvider;
use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;

class DocProviderTest extends TestCase
{

  public function test_getNewestDocProvider()
  {
    Assert::assertEquals('/doc/14.0', DocProvider::getNewestDocProvider()->getMinorUrl());
  }
}
