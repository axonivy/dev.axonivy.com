<?php

namespace test\ui;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use test\AppTester;

class UiDownloadActionTest extends TestCase
{
  public function testDownloadResponseContainsReleaseBuckets(): void
  {
    $body = AppTester::assertThatGet('/ui/download')
      ->ok()
      ->contentType('application/json')
      ->getBody();
    $response = json_decode($body, true, 512, JSON_THROW_ON_ERROR);

    Assert::assertSame(['ltsCurrent', 'ltsMaintenance', 'le', 'dev'], array_keys($response));
    Assert::assertCount(1, $response['ltsCurrent']);
    Assert::assertCount(1, $response['ltsMaintenance']);
    Assert::assertCount(1, $response['le']);
    Assert::assertCount(1, $response['dev']);
    Assert::assertGreaterThan($response['ltsMaintenance'][0]['version'], $response['ltsCurrent'][0]['version']);
    Assert::assertArrayNotHasKey('docLink', $response['ltsCurrent'][0]);
  }
}