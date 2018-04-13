<?php
namespace app\tutorial;

use Psr\Container\ContainerInterface;

class TutorialAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/tutorial/tutorial.html', [
            'tutorials' => self::getTutorials()
        ]);
    }
    
    private static function getTutorials(): array {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'tutorials.json'));
    }
}
