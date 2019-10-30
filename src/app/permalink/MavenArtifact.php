<?php
namespace app\permalink;

use app\util\StringUtil;

class MavenArtifact
{

    public static function getMavenArtifact($key, $type): ?MavenArtifact
    {
        $artifacts = self::getAll();
        foreach ($artifacts as $artifact) {
            if ($artifact->getKey() == $key && $artifact->getType() == $type) {
                return $artifact;
            }
        }
        return null;
    }

    private static function getAll(): array
    {
        return array_merge(
            self::getProjectDemos(),
            self::getValveDemos(),
            self::getJsfWorkflowUi(),
            self::getPortal(),
            self::getDocFactory()
        );
    }

    public static function getProjectDemos(): array
    {
        $groupdId = 'ch.ivyteam.ivy.project.demo';
        return [
            new MavenArtifact('quick-start-tutorial', 'Quick Start Tutorial', $groupdId, 'quick-start-tutorial', 'iar', false, false),
            new MavenArtifact('workflow-demos', 'Worklfow Demos', $groupdId, 'workflow-demos', 'iar', false, false),
            new MavenArtifact('error-handling-demos', 'Error Handling Demos', $groupdId, 'error-handling-demos', 'iar', false, false),
            new MavenArtifact('connectivity-demos', 'Connectivity Demos', $groupdId, 'connectivity-demos', 'iar', false, false),
            new MavenArtifact('rule-engine-demos', 'Rule Engine Demos', $groupdId, 'rule-engine-demos', 'iar', false, false),
            new MavenArtifact('html-dialog-demos', 'Html Dialog Demos', $groupdId, 'html-dialog-demos', 'iar', false, false),
            new MavenArtifact('demos', 'Demo App', 'ch.ivyteam.ivy.project.demo', 'ivy-demos-app', 'zip', false, false)
        ];
    }

    public static function getValveDemos(): array
    {
        return [
            new MavenArtifact('processing-valve', 'Processing Valve Demo', 'com.acme', 'com.acme.ProcessingValve', 'jar', false, false)
        ];
    }

    private static function getJsfWorkflowUi(): array
    {
        return [
            new MavenArtifact('jsf-workflow-ui', 'JSF Workflow UI', 'ch.ivyteam.ivy.project.wf', 'JsfWorkflowUi', 'iar', false, false)
        ];
    }

    public static function getPortal(): array
    {
        return [
            new MavenArtifact('portal', 'Portal App', 'ch.ivyteam.ivy.project.portal', 'portal-app', 'zip', false, false),
            new MavenArtifact('portal-template', 'Portal Template', 'ch.ivyteam.ivy.project.portal', 'portalTemplate', 'iar', true, false),
            new MavenArtifact('portal-style', 'Portal Style', 'ch.ivyteam.ivy.project.portal', 'portalStyle', 'iar', false, false),
            new MavenArtifact('portal-kit', 'Portal Kit', 'ch.ivyteam.ivy.project.portal', 'portalKit', 'iar', false, false),
            new MavenArtifact('axonivy-express', 'Axon.ivy Express', 'ch.ivyteam.ivy.project.portal', 'axonIvyExpress', 'iar', false, false),
            new MavenArtifact('portal-examples', 'Portal Examples', 'ch.ivyteam.ivy.project.portal', 'portalExamples', 'iar', false, false)
        ];
    }

    public static function getDocFactory(): array
    {
        return [
            new MavenArtifact('doc-factory', 'Doc Factory', 'ch.ivyteam.ivy.addons', 'doc-factory', 'iar', true, false),
            new MavenArtifact('doc-factory-demo', 'Doc Factory Demo', 'ch.ivyteam.ivy.addons', 'doc-factory-demo', 'iar', false, false),
            new MavenArtifact('doc-factory-doc', 'Doc Factory Documentation', 'ch.ivyteam.ivy.addons', 'doc-factory-doc', 'zip', false, true)
        ];
    }

    private $key;

    private $name;

    private $groupId;

    private $artifactId;

    private $type;

    private $versionCache = null;

    private $makesSenseAsMavenDependency;

    private $isDocumentation;

    public function __construct($key, $name, $groupId, $artifactId, $type, bool $makesSenseAsMavenDependency, bool $isDocumentation)
    {
        $this->key = $key;
        $this->name = $name;
        $this->groupId = $groupId;
        $this->artifactId = $artifactId;
        $this->type = $type;
        $this->makesSenseAsMavenDependency = $makesSenseAsMavenDependency;
        $this->isDocumentation = $isDocumentation;
    }

    private function getKey(): string
    {
        return $this->key;
    }

    public function getGroupId(): string
    {
        return $this->groupId;
    }

    public function getArtifactId(): string
    {
        return $this->artifactId;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getDisplayName(): string
    {
        return $this->name;
    }

    public function getMakesSenseAsMavenDependency(): bool
    {
        return $this->makesSenseAsMavenDependency;
    }

    public function isDocumentation(): bool
    {
        return $this->isDocumentation;
    }

    public function getDocUrl($version)
    {
        return $this->getUrl($version) . '!/index.html';
    }
    
    public function getDevUrl()
    {
        $versions = $this->getVersions();
        if (!empty($versions)) {
            return $this->getUrl($versions[0]);
        }
        return "";
    }

    public function getUrl($version)
    {
        $concretVersion = $version;

        $baseUrl = $this->getBaseUrl();
        if (StringUtil::contains($version, 'SNAPSHOT')) {
            // TODO Cache
            $xml = $this->get_contents("$baseUrl/$version/maven-metadata.xml");
            if (empty($xml)) {
                return "";
            }
            $concretVersion = $this->parseVersionIdentifierFromXml($xml);
        }
        return $baseUrl . '/' . $version . '/' . $this->artifactId . '-' . $concretVersion . '.' . $this->type;
    }

    private function parseVersionIdentifierFromXml(string $xml): string
    {
        $element = new \SimpleXMLElement($xml);
        $result = $element->xpath('/metadata/versioning/snapshotVersions/snapshotVersion');
        return $result[0]->value;
    }

    private function getBaseUrl()
    {
        $groupId = str_replace('.', '/', $this->groupId);
        return MAVEN_ARTIFACTORY_URL . "$groupId/" . $this->artifactId;
    }

    public function getPermalinkDev()
    {
        return '/permalink/lib/dev/' . $this->key . '.' . $this->type;
    }

    public function getVersions(): array
    {
        if ($this->versionCache == null) {
            $baseUrl = $this->getBaseUrl();
            
            $xml = $this->get_contents("$baseUrl/maven-metadata.xml");

            if (empty($xml)) {
                $this->versionCache = [];
                return $this->versionCache;
            }

            $element = new \SimpleXMLElement($xml);
            $result = $element->xpath('/metadata/versioning/versions');
            $versions = get_object_vars($result[0]->version);

            $v = array_values($versions);
            usort($v, 'version_compare');
            $v = array_reverse($v);

            $this->versionCache = $v;
        }
        return $this->versionCache;
    }

    private function get_contents($url)
    {
        $headers = get_headers($url);
        $statusCode = substr($headers[0], 9, 3);
        if ($statusCode == "200") {
            return file_get_contents($url);
        }
        return "";
    }
}
