<?php
namespace app\doc;

use Psr\Container\ContainerInterface;

class DocAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'newAndNoteworthyHtml' => DocProvider::getNewAndNoteworthyHtml()
        ]);
    }
}
