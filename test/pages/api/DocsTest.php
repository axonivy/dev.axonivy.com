<?php

namespace test\pages\api;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use test\AppTester;

class DocsTest extends TestCase
{  
  public function testVersions()
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/8.0/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"7.0","url":"\/doc\/7.0\/en"},{"version":"8.0","url":"\/doc\/8.0\/en"},{"version":"9.4","url":"\/doc\/9.4\/en"}]');

    AppTester::assertThatGet('/api/docs/AxonIvy/7.0/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"7.0","url":"\/doc\/7.0\/en"},{"version":"8.0","url":"\/doc\/8.0\/en"},{"version":"9.4","url":"\/doc\/9.4\/en"}]');
 
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/en')
      ->ok()
      ->bodyContains('"versions":[{"version":"7.0","url":"\/doc\/7.0\/en"},{"version":"8.0","url":"\/doc\/8.0\/en"},{"version":"9.4","url":"\/doc\/9.4\/en"}]');
 
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/ja')
      ->ok()
      ->bodyContains('"versions":[{"version":"7.0","url":"\/doc\/7.0\/en"},{"version":"8.0","url":"\/doc\/8.0\/en"},{"version":"9.4","url":"\/doc\/9.4\/ja"}]');
  }
  
  public function testVersionUnknown() 
  {
    AppTester::assertThatGet('/api/docs/AxonIvy/13.2/ja')
      ->ok()
      ->bodyContains('"versions":[{"version":"7.0","url":"\/doc\/7.0\/en"},{"version":"8.0","url":"\/doc\/8.0\/en"},{"version":"9.4","url":"\/doc\/9.4\/ja"},{"version":"13.2","url":"#"}]');
    AppTester::assertThatGet('/api/docs/AxonIvy/9.4/ch')
      ->ok()
      ->bodyContains('"versions":[{"version":"7.0","url":"\/doc\/7.0\/en"},{"version":"8.0","url":"\/doc\/8.0\/en"},{"version":"9.4","url":"\/doc\/9.4\/en"}]');
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
    AppTester::assertThatGet('/api/docs/AxonIvy/13.2/en')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"#"}]');

    AppTester::assertThatGet('/api/docs/AxonIvy/7.0/ch')
      ->ok()
      ->bodyContains('"languages":[{"language":"en","url":"\/doc\/7.0\/en"},{"language":"ch","url":"\/doc\/7.0\/ch"}]');
  }
}
