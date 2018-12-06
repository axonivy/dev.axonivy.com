<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use app\release\model\ReleaseInfoRepository;
use app\release\model\doc\DocProvider;
use Slim\Http\Response;
use app\util\StringUtil;
use app\release\model\Version;

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

        $docLinks = $this->getDocLinks();
        
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'version' => $version,
            'docProvider' => $docProvider,
            'documentUrl' => $doc->getRessourceUrl(),
            'currentNiceUrlPath' => $document,
            'docLinks' => $docLinks
        ]);
    }
    
    private function getDocLinks(): array {
        $DOCPREFIX = '/doc';
        
        $docUrls = [];
        
        $releaseInfo = ReleaseInfoRepository::getLatest();
        if ($releaseInfo != null) {
            $docUrls[$releaseInfo->getVersion()->getMinorVersion()] = $DOCPREFIX;
        }
        foreach (LTS_VERSIONS as $ltsVersion) {
            $docUrls[$ltsVersion] = $DOCPREFIX . '/' . $ltsVersion . '.latest';
        }
        $docUrls['dev'] = $DOCPREFIX . '/dev';
        
        $docLinks = [];
        foreach ($docUrls as $text => $url) {
            $docLinks[] = $this->createDocLink(
                $url,
                $text);
        }
        return $docLinks;
    }
    
    private function createDocLink($url, $text) {
        return [
            'url' => $url,
            'displayText' => $text
        ];
    }
}
