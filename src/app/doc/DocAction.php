<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use app\release\ReleaseInfoRepository;
use Slim\Exception\NotFoundException;

class DocAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        $version = $args['version']; // 7.0.3, latest, 7.0.latest
        $document = $args['document']; // DesignerGuideHtml, PublicAPI
        
        
        // if (PublicAPi -> redirect uf public api)
        
        
        $releaseInfo = ReleaseInfoRepository::getReleaseInfo($version);
        if ($releaseInfo == null) {
            throw new NotFoundException($request, $response);
        }
        
        $docs = $releaseInfo->getDocuments('');
        
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'docs' => $docs,
            'newAndNoteworthyHtml' => DocProvider::getNewAndNoteworthyHtml()
        ]);
    }
}
