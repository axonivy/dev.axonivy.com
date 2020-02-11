<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;
use app\release\model\ReleaseInfoRepository;
use app\release\model\doc\DocProvider;
use Slim\Http\Response;

class DocAction
{

    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke($request, Response $response, $args)
    {
        $version = $args['version'];

        if (empty($version)) {
            return $this->renderDocOverview($response);
        }

        $docProvider = new DocProvider($version);
        if (!$docProvider->exists()) {
            throw new NotFoundException($request, $response);
        }
        
        // since version 9, also for dev, nightly and sprint releases
        // TODO: Add 'latest' to this check once latest points to release 9.1.0!
        if (version_compare($version, 9) >= 0 ||
                $version === 'dev' || $version === 'nightly' || $version === 'sprint') {
            $document = $args['document'];
            if (empty($document)) {
                return $response->withRedirect("/doc/$version/index.html", 301);
            }
            if ($document == 'migration-notes') {
                return $response->withRedirect('axonivy/migration/index.html', 301);
            }
            if ($document == 'release-notes') {
                return $response->withRedirect('axonivy/release-notes/index.html', 301);
            }
            if ($document == 'new-and-noteworthy') {
                return $response->withRedirect('/news', 301);
            }
            throw new NotFoundException($request, $response); 
        }

        // legacy, before 9
        $document = $args['document'] ?? $docProvider->getNewAndNoteworthy()->getNiceUrlPath();
        if ($document == 'ReleaseNotes.html') {
            return $response->withRedirect('release-notes', 301);
        }

        $doc = $docProvider->findDocumentByNiceUrlPath($document);
        if ($doc == null) {
            throw new NotFoundException($request, $response);
        }
        
        $docLinks = $this->getDocLinks();

        $portalLink = "";
        if (version_compare($version, 8) >= 0) {
           if ($version == '8.0.0') {
            $portalLink =  '/documentation/portal-developer-guide/8.0.183.2/';
           } else {
            $portalLink = "/documentation/portal-guide/$version/";  
           }
        }
        return $this->container->get('view')->render($response, 'app/doc/doc.html', [
            'version' => $version,
            'docProvider' => $docProvider,
            'documentUrl' => $doc->getRessourceUrl() . '?v=' . time(),
            'currentNiceUrlPath' => $document,
            'docLinks' => $docLinks,
            'portalLink' => $portalLink,
        ]);
    }

    private function renderDocOverview(Response $response) {
        return $this->container->get('view')->render($response, 'app/doc/doc-overview.html', [
               'docLinksLTS' => self::getDocLinksLTS(),
               'docLinksLE' => self::getDocLinksLE(),
               'docLinksDEV' => self::getDocLinksDev()
        ]);
    }

    private function getDocLinks(): array {
        $docLinks = array_merge(self::getDocLinksLE(), self::getDocLinksLTS());
        $docLinks['dev'] = self::createDocLink('/doc/dev', 'dev');
        return $docLinks;
    }
    
    private static function getDocLinksLE(): array
    {
        $docLinks = [];
        $releaseInfo = ReleaseInfoRepository::getLatest();
        if ($releaseInfo != null && !$releaseInfo->getVersion()->isLongTermSupportVersion()) {
            $docLinks[] = self::createDocLink('/doc/latest', $releaseInfo->getVersion()->getMinorVersion());
        }
        return $docLinks;
    }

    private static function getDocLinksLTS(): array
    {
        $docLinks = [];
        foreach (LTS_VERSIONS as $ltsVersion) {
            $docLinks[] = self::createDocLink("/doc/$ltsVersion.latest", $ltsVersion) ;
        }
        return $docLinks;
    }

    private static function getDocLinksDev(): array
    {
        $docLinks = [];
        $docLinks['sprint'] = self::createDocLink('/doc/sprint', 'Sprint');
        $docLinks['nightly'] = self::createDocLink('/doc/nightly', 'Nightly');
        return $docLinks;
    }

    private static function createDocLink($url, $text) {
        return [
            'url' => $url,
            'displayText' => $text
        ];
    }
}
