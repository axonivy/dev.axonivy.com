<?php
namespace test\permalink;

use PHPUnit\Framework\TestCase;
use app\permalink\MavenArtifact;

class MavenArtifactTest extends TestCase
{
    public function testGetMavenArtifact() {
        $artifact = MavenArtifact::getMavenArtifact('workflow-demos', 'iar');
        $this->assertEquals('Workflow Demos', $artifact->getDisplayName());
    }
    
    public function testGetMavenArtifact_notExisting() {
        $artifact = MavenArtifact::getMavenArtifact('does not exist', '');
        $this->assertNull($artifact);
    }

    public function testGetProjectDemosApp() {
        $artifacts = MavenArtifact::getProjectDemos();
        $this->assertEquals('Demo App', $artifacts[6]->getDisplayName());
    }

    public function testGetDocFactory() {
        $artifacts = MavenArtifact::getDocFactory();
        $this->assertEquals('Doc Factory', $artifacts[0]->getDisplayName());
    }

    public function testGetProjectDemos() {
        $artifacts = MavenArtifact::getProjectDemos();
        $this->assertEquals('Quick Start Tutorial', $artifacts[0]->getDisplayName());
    }

    public function testMavenArtifact() {
        $artifact = MavenArtifact::getMavenArtifact('connectivity-demos', 'iar');
        $this->assertEquals('Connectivity Demos', $artifact->getDisplayName());
        $this->assertEquals('ch.ivyteam.ivy.project.demo', $artifact->getGroupId());
        $this->assertEquals('connectivity-demos', $artifact->getArtifactId());
        $this->assertEquals('/permalink/lib/dev/connectivity-demos.iar', $artifact->getPermalinkDev());
    }

    public function testParseLatestVersionFromXml() {
        $xml = file_get_contents(dirname(__FILE__) . '/maven-metadata.xml');
        $versions = MavenArtifact::parseVersions($xml);
        $this->assertEquals('7.2.0-SNAPSHOT', $versions[0]);
        $this->assertEquals('7.3.0-SNAPSHOT', $versions[1]);
    }

    public function testParseVersionIdentifierFromXml() {
        $xml = file_get_contents(dirname(__FILE__) . '/maven-metadata-specific.xml');
        $version = MavenArtifact::parseVersionIdentifierFromXml($xml);
        $this->assertEquals('7.3.0-20181115.013605-5', $version);
    }
}
