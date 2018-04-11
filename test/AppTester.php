<?php
namespace test;

use PHPUnit\Framework\Assert;
use Slim\Http\Environment;
use Slim\Http\Request;
use Slim\Http\Response;
use app\Website;
use Exception;
use PHPUnit\Framework\Constraint\Exception as ExceptionConstraint;
use Slim\Exception\NotFoundException;

class AppTester
{
    private $response;

    private function __construct(Response $response)
    {
        $this->response = $response;
    }

    public static function assertThatGet(string $url): AppTester
    {
        return new AppTester(self::get($url));
    }

    public static function assertThatGetThrowsNotFoundException(string $url)
    {
        self::assertThatGetThrowsException($url, NotFoundException::class);
    }

    public static function assertThatGetThrowsException(string $url, string $expectedException)
    {
        try {
            $response = self::get($url);
            Assert::assertTrue(false, 'Should throw exception ' . $expectedException);
        } catch (Exception $exception) {
            Assert::assertThat($exception, new ExceptionConstraint($expectedException));
        }
    }

    private static function get(string $url): Response
    {
        $app = (new Website())->getApp();
        $environment = Environment::mock([
            'REQUEST_METHOD' => 'GET',
            'REQUEST_URI' => $url
        ]);
        $request = Request::createFromEnvironment($environment);
        $response = $app($request, new \Slim\Http\Response());
        return $response;
    }

    public function bodyContains(string $expectedToContain)
    {
        $body = $this->response->getBody();
        $body->rewind();
        $content = $body->getContents();
        Assert::assertContains($expectedToContain, $content);
        return $this;
    }
    
    public function getBody() {
        $body = $this->response->getBody();
        $body->rewind();
        $content = $body->getContents();
        return $content;
    }

    public function statusCode(int $expectedStatusCode): AppTester
    {
        Assert::assertEquals($expectedStatusCode, $this->response->getStatusCode());
        return $this;
    }

    public function contentType(string $expectedContentType): AppTester
    {
        Assert::assertEquals($expectedContentType, $this->response->getHeader('Content-Type')[0]);
        return $this;
    }
}