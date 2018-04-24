<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use app\release\model\DocProvider;

class DocAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args)
    {
        $version = $args['version'] ?? 'latest';
        $document = $args['document'] ?? 'DesignerGuideHtml';
        
        $docProvider = new DocProvider($version);
        if (! $docProvider->exists()) {
            throw new NotFoundException($request, $response);
        }
        
        $doc = $docProvider->findDocument($document);
        
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'version' => $version,
            'docProvider' => $docProvider,
            'documentUrl' => $doc == null ? '' : $doc->getPublicUrl()
        ]);
    }
}
