<?php
namespace app\doc;

use Psr\Container\ContainerInterface;
use app\release\model\ReleaseInfoRepository;
use app\release\model\doc\DocProvider;
use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\util\Redirect;

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
        if (! $docProvider->exists()) {
            throw new HttpNotFoundException($request);
        }

        // since version 9, also for dev, nightly and sprint releases
        // TODO: Add 'latest' to this check once latest points to release 9.1.0!
        if (version_compare($version, 9) >= 0 || $version === 'dev' || $version === 'nightly' || $version === 'sprint') {
            $document = $args['document'];
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
            if ($version == '8.0.0') {
                $portalLink = '/documentation/portal-guide/8.0.1/';
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
            'portalLink' => $portalLink
        ]);
    }

    private function renderDocOverview($response)
    {
        return $this->container->get('view')->render($response, 'app/doc/doc-overview.html', [
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
        $docLinks = [];
        $releaseInfo = ReleaseInfoRepository::getLatest();
        if ($releaseInfo != null && ! $releaseInfo->getVersion()->isLongTermSupportVersion()) {
            $docLinks[] = self::createDocLink('/doc/latest', $releaseInfo->getVersion()->getMinorVersion());
        }
        return $docLinks;
    }

    private static function getDocLinksLTS(): array
    {
        $docLinks = [];
        foreach (LTS_VERSIONS as $ltsVersion) {
            $docLinks[] = self::createDocLink("/doc/$ltsVersion.latest", $ltsVersion);
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

    private static function createDocLink($url, $text)
    {
        return [
            'url' => $url,
            'displayText' => $text
        ];
    }
}
