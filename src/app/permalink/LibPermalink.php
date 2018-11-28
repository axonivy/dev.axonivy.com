<?php
namespace app\permalink;

use Slim\Exception\NotFoundException;

class LibPermalink
{
    public function __invoke($request, $response, $args) {
        $version = $args['version'];
        if ($version != 'dev') {
            throw new NotFoundException($request, $response);
        }
        
        $name = $args['name'] ?? ''; // e.g demo-app.zip
        
        $type = pathinfo($name, PATHINFO_EXTENSION); // e.g. zip
        $filename = pathinfo($name, PATHINFO_FILENAME); // e.g. demo-app
        
        $mavenArtifact = MavenArtifact::getMavenArtifact($filename);
        if ($mavenArtifact == null) {
            throw new NotFoundException($request, $response);
        }

        $url = $this->createLink($mavenArtifact->getGroupId(), $mavenArtifact->getArtifactId(), $type);
        
        return $response->withRedirect($url);
    }
    
    private function createLink($groupId, $artifactId, $type): string
    {
        $groupId = $this->convertToUrl($groupId);
        $baseUrl = MAVEN_ARTIFACTORY_URL . "/$groupId/$artifactId";
        
        $content = file_get_contents("$baseUrl/maven-metadata.xml");
        
        $releaseVersion = $this->parseReleaseVersionFromXml($content);
        
        $url = "";
        if (empty($releaseVersion))
        {
            // snapshot version
            $latestVersion = $this->parseLatestVersionFromXml($content);
            $content = file_get_contents("$baseUrl/$latestVersion/maven-metadata.xml");
            $build = $this->parseVersionIdentifierFromXml($content);
            $url = "$baseUrl/$latestVersion/$artifactId-$build.$type";
        }
        else
        {
            // release version
            $url = "$baseUrl/$releaseVersion/$artifactId-$releaseVersion.$type";
        }
        
        return $url;
    }
    
    private function convertToUrl(string $part): string
    {
        return str_replace('.', '/', $part);
    }
    
    public function parseReleaseVersionFromXml(string $xml): ?string
    {
        $element = new \SimpleXMLElement($xml);
        $result = $element->xpath('/metadata/versioning/release');
        return $result[0][0];
    }
    
    public function parseLatestVersionFromXml(string $xml): string
    {
        $element = new \SimpleXMLElement($xml);
        $result = $element->xpath('/metadata/versioning/latest');
        return $result[0][0];
    }
    
    public function parseVersionIdentifierFromXml(string $xml): string
    {
        $element = new \SimpleXMLElement($xml);
        $result = $element->xpath('/metadata/versioning/snapshotVersions/snapshotVersion');
        return $result[0]->value;
    }
}
