<?php

namespace test\permalink;

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
    
    AppTester::assertThatGet('/link/docker-samples')->redirect('https://github.com/ivy-samples/docker-samples');
  }
  
  public function testRedirectToDemos()
  {
      AppTester::assertThatGet('/link/demos')->redirect('https://github.com/ivy-samples/ivy-project-demos');
  }
  
  public function testRedirectToBuildPlugin()
  {
      AppTester::assertThatGet('/link/build-plugin')->redirect('https://github.com/axonivy/project-build-plugin');
  }
  
  public function testRedirectToWebtester()
  {
      AppTester::assertThatGet('/link/webtester')->redirect('https://github.com/axonivy/web-tester');
  }
  
  public function testRedirectToFile()
  {
      $prefixDocker = 'https://github.com/ivy-samples/docker-samples/';
      $prefixDemos = 'https://github.com/ivy-samples/ivy-project-demos/';
      $prefixBuildPlugin = 'https://github.com/axonivy/project-build-plugin/';
      $prefixWebtester = 'https://github.com/axonivy/web-tester/';

      AppTester::assertThatGet('/link/docker-samples/blob/master/ivy-scaling/README.md')->redirect($prefixDocker . 'blob/master/ivy-scaling/README.md');
      AppTester::assertThatGet('/link/demos/blob/master/README.md')->redirect($prefixDemos . 'blob/master/README.md');
      AppTester::assertThatGet('/link/build-plugin/blob/master/README.md')->redirect($prefixBuildPlugin . 'blob/master/README.md');
      AppTester::assertThatGet('/link/webtester/blob/master/web-tester/CHANGELOG.md')->redirect($prefixWebtester . 'blob/master/web-tester/CHANGELOG.md');
  }
}
