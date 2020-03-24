<?php
namespace test;

use PHPUnit\Framework\Assert;
use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use Slim\Psr7\Factory\RequestFactory;
use app\Website;

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

    private static function get(string $url): Response
    {
        $app = (new Website())->getApp();
        $request = (new RequestFactory())->createRequest('GET', $url);
        return $app->handle($request);
    }

    public function bodyContains(string $expectedToContain)
    {
        $body = $this->response->getBody();
        $body->rewind();
        $content = $body->getContents();
        Assert::assertStringContainsString($expectedToContain, $content);
        return $this;
    }
    
    public function getBody() {
        $body = $this->response->getBody();
        $body->rewind();
        $content = $body->getContents();
        return $content;
    }
    
    public function header($name, $value) {
        $actual = $this->response->getHeader($name)[0];
        Assert::assertEquals($value, $actual);
        return $this;
    }

    public function statusCode(int $expectedStatusCode): AppTester
    {
        Assert::assertEquals($expectedStatusCode, $this->response->getStatusCode());
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