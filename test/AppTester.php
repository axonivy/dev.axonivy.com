<?php

namespace test;

use PHPUnit\Framework\Assert;
use Slim\Psr7\Response;
use Slim\Psr7\Factory\RequestFactory;
use app\Website;

class AppTester
{
  private Response $response;

  private array $cookies;

  private function __construct(Response $response)
  {
    $this->response = $response;
  }

  public static function assertThatGet(string $url): AppTester
  {
    $app = (new Website())->app();
    $request = (new RequestFactory())->createRequest('GET', $url);
    $response = $app->handle($request);
    return new AppTester($response);
  }

  public function bodyDoesNotContain(string $stringNotContain): AppTester
  {
    $body = $this->response->getBody();
    $body->rewind();
    $content = $body->getContents();
    Assert::assertStringNotContainsStringIgnoringCase($stringNotContain, $content);
    return $this;
  }

  public function bodyContains(string $expectedToContain): AppTester
  {
    $body = $this->response->getBody();
    $body->rewind();
    $content = $body->getContents();
    Assert::assertStringContainsString($expectedToContain, $content);
    return $this;
  }
  
  public function bodyContainsIgnoreWhitespaces(string $expectedToContain): AppTester
  {
    $expectedToContain = preg_replace('/\s+/', '', $expectedToContain);
    $content = preg_replace('/\s+/', '', $this->getBody());
    Assert::assertStringContainsString($expectedToContain, $content);
    return $this;
  }

  public function getBody(): string
  {
    $body = $this->response->getBody();
    $body->rewind();
    $content = $body->getContents();
    return $content;
  }

  public function header($name, $value): AppTester
  {
    $actual = $this->response->getHeader($name)[0];
    Assert::assertEquals($value, $actual);
    return $this;
  }

  public function statusCode(int $expectedStatusCode): AppTester
  {
    Assert::assertEquals($expectedStatusCode, $this->response->getStatusCode());
    return $this;
  }

  public function ok(): AppTester
  {
    self::statusCode(200);
    return $this;
  }

  public function notFound(): AppTester
  {
    self::statusCode(404);
    return $this;
  }

  public function redirect(string $url): AppTester
  {
    self::statusCode(302);
    self::header('Location', $url);
    return $this;
  }

  public function permanentRedirect(string $url): AppTester
  {
    self::statusCode(301);
    self::header('Location', $url);
    return $this;
  }

  public function contentType(string $expectedContentType): AppTester
  {
    Assert::assertEquals($expectedContentType, $this->response->getHeader('Content-Type')[0]);
    return $this;
  }
}
