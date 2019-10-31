<?php
namespace app\permalink;

use app\util\StringUtil;

class MavenArtifactBuilder
{
    private $key;
    private $name;
    private $groupId;
    private $artifactId;
    private $type = 'iar';
    private $makesSenseAsMavenDependency = false;
    private $isDocumentation = false;
    
    public function __construct($key)
    {
        $this->key = $key;
    }
    
    public function name(string $name): MavenArtifactBuilder
    {
        $this->name = $name;
        return $this;
    }
    
    public function groupId(string $groupId): MavenArtifactBuilder
    {
        $this->groupId = $groupId;
        return $this;
    }
    
    public function artifactId(string $artifactId): MavenArtifactBuilder
    {
        $this->artifactId = $artifactId;
        return $this;
    }
    
    public function type(string $type): MavenArtifactBuilder
    {
        $this->type = $type;
        return $this;
    }
    
    public function makesSenseAsMavenDependency(): MavenArtifactBuilder
    {
        $this->makesSenseAsMavenDependency = true;
        return $this;
    }
    
    public function doc(): MavenArtifactBuilder
    {
        $this->isDocumentation = true;
        return $this;
    }
    
    public function build(): MavenArtifact
    {
        return new MavenArtifact(
            $this->key,
            $this->name,
            $this->groupId,
            $this->artifactId,
            $this->type,
            $this->makesSenseAsMavenDependency,
            $this->isDocumentation);
    }
}

class MavenArtifact
{
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
    
    public static function create(string $key): MavenArtifactBuilder
    {
        return new MavenArtifactBuilder($key);
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
            $concretVersion = self::parseVersionIdentifierFromXml($xml);
        }
        return $baseUrl . '/' . $version . '/' . $this->artifactId . '-' . $concretVersion . '.' . $this->type;
    }

    public static function parseVersionIdentifierFromXml(string $xml): string
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

            $v = self::parseVersions($xml);
            
            usort($v, 'version_compare');
            $v = array_reverse($v);

            $this->versionCache = $v;
        }
        return $this->versionCache;
    }
    
    public static function parseVersions($xml) {
        $element = new \SimpleXMLElement($xml);
        $result = $element->xpath('/metadata/versioning/versions');
        $versions = get_object_vars($result[0]->version);
        return array_values($versions);
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
