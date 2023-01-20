<?php

namespace test\domain;

use app\domain\doc\DocProvider;
use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\domain\Version;

class DocProviderTest extends TestCase
{

  public function test_getNewestDocUrl()
  {
    Assert::assertEquals('/doc/9.4', DocProvider::getNewestDocUrl());
  }
}
