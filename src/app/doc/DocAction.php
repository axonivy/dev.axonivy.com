<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\release\model\doc\DocProvider;
use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\util\Redirect;
use app\util\StringUtil;

class DocAction
{
    private $view;

    public function __construct(ContainerInterface $container)
    {
        $this->view = $container->get('view');
    }

    public function __invoke($request, Response $response, $args)
    {
        $version = $args['version'];

        if (empty($version)) {
            return $this->renderDocOverview($response);
        }
        
        // special treatment when using a major version e.g. 8/9/10
        if (strlen($version) == 1 && is_numeric($version)) {
            $bestMatchingVersion = ReleaseInfoRepository::getBestMatchingMinorVersion($version);
            if (StringUtil::notEqual($bestMatchingVersion, $version))
            {
                $doc = $args['document'] ?? '';
                if (!empty($doc)) {
                    $doc = '/' . $doc;
                }
                return Redirect::to($response, "/doc/$bestMatchingVersion" . $doc);    
            }
        }

        $docProvider = new DocProvider($version);
        if (! $docProvider->exists()) {
            throw new HttpNotFoundException($request);
        }

        // since version 9, also for dev, nightly and sprint releases
        // TODO: Add 'latest' to this check once latest points to release 9.1.0!
        if (version_compare($version, 9) >= 0 || $version === 'dev' || $version === 'nightly' || $version === 'sprint') {
            $document = $args['document'];
            return $this->redirectOldLinksToNewReadTheDocs($request, $response, $version, $document);
        }

        // legacy, before 9
        $doc = null;
        if (isset($args['document'])) {
            $document = $args['document'];
            if ($document == 'ReleaseNotes.html') {
                return Redirect::to($response, 'release-notes');
            }
            $doc = $docProvider->findDocumentByNiceUrlPath($document);
        } else {
            $doc = $docProvider->getOverviewDocument();
        }

        if ($doc == null) {
            throw new HttpNotFoundException($request);
        }

        $docLinks = $this->getDocLinks();

        $portalLink = "";
        if (version_compare($version, 8) >= 0) {
            $portalLink = '/portal/8.0/doc';
        }
        return $this->view->render($response, 'app/doc/doc.html', [
            'version' => $version,
            'docProvider' => $docProvider,
            'documentUrl' => $doc->getRessourceUrl() . '?v=' . time(),
            'currentNiceUrlPath' => $document,
            'docLinks' => $docLinks,
            'portalLink' => $portalLink
        ]);
    }

    private function redirectOldLinksToNewReadTheDocs($request, $response, $version, $document)
    {
        if (empty($document)) {
            return Redirect::to($response, "/doc/$version/index.html");
        }
        if ($document == 'migration-notes') {
            return Redirect::to($response, 'axonivy/migration/index.html');
        }
        if ($document == 'release-notes') {
            return Redirect::to($response, 'axonivy/release-notes/index.html');
        }
        if ($document == 'new-and-noteworthy') {
            return Redirect::to($response, '/news');
        }
        throw new HttpNotFoundException($request);
    }
    
    private function renderDocOverview($response)
    {
        return $this->view->render($response, 'app/doc/doc-overview.html', [
            'docLinksLTS' => self::getDocLinksLTS(),
            'docLinksLE' => self::getDocLinksLE(),
            'docLinksDEV' => self::getDocLinksDev()
        ]);
    }

    private function getDocLinks(): array
    {
        return array_merge(self::getDocLinksLE(), self::getDocLinksLTS());
    }

    private static function getDocLinksLE(): array
    {
        $releaseInfo = ReleaseInfoRepository::getLeadingEdge();
        if ($releaseInfo == null) {
            return [];
        }

        $minorVersion = $releaseInfo->getVersion()->getMinorVersion();
        return [
            self::createDocLink("/doc/$minorVersion", $releaseInfo->getVersion()->getMinorVersion())
        ];
    }

    private static function getDocLinksLTS(): array
    {
        $docLinks = [];
        foreach (LTS_VERSIONS as $ltsVersion) {
            $docLinks[] = self::createDocLink("/doc/$ltsVersion", $ltsVersion);
        }
        return $docLinks;
    }

    private static function getDocLinksDev(): array
    {
        return [
            self::createDocLink('/doc/sprint', 'Sprint'),
            self::createDocLink('/doc/nightly', 'Nightly')
        ];
    }

    private static function createDocLink($url, $text)
    {
        return [
            'url' => $url,
            'displayText' => $text
        ];
    }
}
