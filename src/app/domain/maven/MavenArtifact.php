<?php
namespace app\domain\maven;

use app\domain\util\StringUtil;

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

    function __construct($key, $name, $groupId, $artifactId, $type, bool $makesSenseAsMavenDependency, bool $isDocumentation)
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

    public function getKey(): string
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

    public function getName(): string
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
        // this folder exists on server as ~/data/cache-doc and is symlinked to webroot in Jenkinsfile
        // cache will be build with ~/script/clone-doc.sh
        return '/documentation/' . $this->getDocSubFolder($version);
    }
    
    public function getDocSubFolder($version) {
        return $this->artifactId . '/' . $version;
    }

    public function docExists($version)
    {
        return file_exists(DOC_DIRECTORY_THIRDPARTY . '/' . $this->getDocSubFolder($version));
    }

    public function getDevUrl()
    {
        $versions = $this->getVersions();
        if (empty($versions)) {
            return "";
        }
        return $this->getUrl($versions[0]);
    }

    public function getUrl($version)
    {
        $concretVersion = $version;

        $baseUrl = $this->getBaseUrl();
        if (StringUtil::contains($version, 'SNAPSHOT')) {
            $xml = HttpRequester::request("$baseUrl/$version/maven-metadata.xml");
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
            
            $xml = HttpRequester::request("$baseUrl/maven-metadata.xml");

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
}

/* caching on request scope */
class HttpRequester
{
    private static $cache = [];
    
    static function request($url)
    {
        if (!isset(self::$cache[$url]))
        {
            $headers = get_headers($url);
            $statusCode = substr($headers[0], 9, 3);
            $content = '';
            if ($statusCode == "200") {
                $content = file_get_contents($url);
            }
            self::$cache[$url] = $content;
        }
        return self::$cache[$url];
    }
}

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

