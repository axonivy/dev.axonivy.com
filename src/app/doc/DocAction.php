<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use app\release\model\doc\DocProvider;
use Slim\Http\Response;
use app\util\StringUtil;

class DocAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        $version = $args['version'] ?? 'latest';
        $docProvider = new DocProvider($version);
        if (!$docProvider->exists()) {
            throw new NotFoundException($request, $response);
        }
        
        $document = $args['document'] ?? $docProvider->getNewAndNoteworthy()->getNiceUrlPath();
        if ($document == 'ReleaseNotes.html') {
            return $response->withRedirect('release-notes', 301);
        }
        
        $doc = $docProvider->findDocumentByNiceUrlPath($document);
        if ($doc == null) {
            throw new NotFoundException($request, $response);
        }
        
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'version' => $version,
            'docProvider' => $docProvider,
            'documentUrl' => $doc->getRessourceUrl(),
            'iframeFullWidth' => !StringUtil::endsWith($doc->getRessourceUrl(), '.txt'),
            'currentNiceUrlPath' => $document,
        ]);
    }
}
