<?php

namespace test\api;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use test\AppTester;

class ApiDocsActionTest extends TestCase
{  
  public function testVersions()
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/8.0/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/en"},{"version":"14.0","url":"\/doc\/14.0\/en"}');

    AppTester::assertThatGet('/api/docs/AxonIvy/7.0/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/en"},{"version":"14.0","url":"\/doc\/14.0\/en"}');
 
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/en"},{"version":"14.0","url":"\/doc\/14.0\/en"}');
 
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/ja')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/ja"},{"version":"14.0","url":"\/doc\/14.0\/ja"}');
  }
  
  public function testVersionUnknown() 
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/13.3/ja')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/ja"},{"version":"14.0","url":"\/doc\/14.0\/ja"},{"version":"13.3","url":"#"}]');
    AppTester::assertThatGet('/api/docs/AxonIvy/14.0/ch')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/en"},{"version":"14.0","url":"\/doc\/14.0\/en"}]');
  }

  public function testVersionLatestDoc() 
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/14.0/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/en"},{"version":"14.0","url":"\/doc\/14.0\/en"}]');
    AppTester::assertThatGet('/api/docs/AxonIvy/14.0/ja')
      ->ok()
      ->bodyContains('{"versions":[{"version":"12.0","url":"\/doc\/12.0\/ja"},{"version":"14.0","url":"\/doc\/14.0\/ja"}],"languages":[{"language":"en","url":"\/doc\/14.0\/en"},{"language":"ja","url":"\/doc\/14.0\/ja"}]}');
  }

  public function testVersionDevDoc() 
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/dev/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"12.0","url":"\/doc\/12.0\/en"},{"version":"14.0","url":"\/doc\/14.0\/en"},{"version":"dev","url":"\/doc\/14.0\/en"}]');
    AppTester::assertThatGet('/api/docs/AxonIvy/dev/ja')
      ->ok()
      ->bodyContains('{"versions":[{"version":"12.0","url":"\/doc\/12.0\/ja"},{"version":"14.0","url":"\/doc\/14.0\/ja"},{"version":"dev","url":"\/doc\/14.0\/ja"}],"languages":[{"language":"en","url":"\/doc\/14.0\/en"},{"language":"ja","url":"\/doc\/14.0\/ja"}]}');
  }

  public function testLanguages()
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/8.0/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/8.0\/en"}]');

    AppTester::assertThatGet('/api/docs/AxonIvy/7.0/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/7.0\/en"}]');
 
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/9.4\/en"},{"language":"ja","url":"\/doc\/9.4\/ja"}]');
 
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/ja')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/9.4\/en"},{"language":"ja","url":"\/doc\/9.4\/ja"}]');
  }

  public function testLanguageUnknown()
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/13.3/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"#"}]');

    AppTester::assertThatGet('/api/docs/AxonIvy/7.0/ch')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/7.0\/en"},{"language":"ch","url":"\/doc\/7.0\/ch"}]');
  }

  public function testLanguageLatestDoc()
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/14.0/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/14.0\/en"},{"language":"ja","url":"\/doc\/14.0\/ja"}]');

    AppTester::assertThatGet('/api/docs/AxonIvy/14.0/ja')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/14.0\/en"},{"language":"ja","url":"\/doc\/14.0\/ja"}]');
  }

  public function testLanguageDevDoc()
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/dev/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/14.0\/en"},{"language":"ja","url":"\/doc\/14.0\/ja"}]');

    AppTester::assertThatGet('/api/docs/AxonIvy/dev/ja')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/14.0\/en"},{"language":"ja","url":"\/doc\/14.0\/ja"}]');
  }
}
