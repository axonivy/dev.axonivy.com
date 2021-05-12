<?php

namespace test\pages\link;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LinkActionTest extends TestCase
{
  public function testRedirectUnknownLink()
  {
    AppTester::assertThatGet('/link/unknown')->notFound();
    AppTester::assertThatGet('/link/bla')->notFound();
    AppTester::assertThatGet('/link/b')->notFound();
  }

  public function testRedirectEmptyLink()
  {
    AppTester::assertThatGet('/link')->notFound();
  }

  public function testRedirectToDockerSamples()
  {
    $prefix = 'https://github.com/ivy-samples/docker-samples/tree/master/';
    
    AppTester::assertThatGet('/link/docker-elasticsearch-cluster')->redirect($prefix . 'ivy-elasticsearch-cluster');
    AppTester::assertThatGet('/link/docker-elasticsearch')->redirect($prefix . 'ivy-elasticsearch');
    AppTester::assertThatGet('/link/docker-reverse-proxy-apache')->redirect($prefix . 'ivy-reverse-proxy-apache');
    AppTester::assertThatGet('/link/docker-reverse-proxy-nginx')->redirect($prefix . 'ivy-reverse-proxy-nginx');
    AppTester::assertThatGet('/link/docker-scaling')->redirect($prefix . 'ivy-scaling');
    AppTester::assertThatGet('/link/docker-secrets')->redirect($prefix . 'ivy-secrets');
  }
}
