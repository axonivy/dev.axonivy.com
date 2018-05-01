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
        $document = $args['document'] ?? 'NewAndNoteworthy.html';
        
        if ($version == 'latest') {
            $version = DocProvider::findLatestMinor();
        }
        
        $docProvider = new DocProvider($version);
        if (!$docProvider->exists()) {
            throw new NotFoundException($request, $response);
        }
        
        // Find the requested document and show it in iframe
        $doc = $docProvider->findDocumentByPathName($document);
        
        //$parsedown = new \Parsedown();
        //$html = $parsedown->text(file_get_contents($docProvider->getNewAndNoteworthyMarkdown()));
        
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'version' => $version,
            'docProvider' => $docProvider,
            'documentUrl' => $doc == null ? '' : $doc->getRessourceUrl(),
            'iframeFullWidth' => !StringUtil::endsWith($document, '.txt'),
            //'newAndNoteworthyHtml' => $html
        ]);
    }
}
