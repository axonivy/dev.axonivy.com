<?php
namespace test\permalink;

use PHPUnit\Framework\TestCase;
use app\permalink\MavenArtifact;

class MavenArtifactTest extends TestCase
{
    public function testGetMavenArtifact() {
        $artifact = MavenArtifact::getMavenArtifact('workflow-demos');
        $this->assertEquals('Workflow Demos', $artifact->getDisplayName());
    }
    
    public function testGetMavenArtifact_notExisting() {
        $artifact = MavenArtifact::getMavenArtifact('does not exist');
        $this->assertNull($artifact);
    }

    public function testGetProjectDemosApp() {
        $artifact = MavenArtifact::getProjectDemosApp();
        $this->assertEquals('Demos', $artifact->getDisplayName());
    }

    public function testGetWorkflowUis() {
        $artifacts = MavenArtifact::getWorkflowUis();
        $this->assertEquals('Jsf Workflow Ui', $artifacts[1]->getDisplayName());
    }

    public function testGetProjectDemos() {
        $artifacts = MavenArtifact::getProjectDemos();
        $this->assertEquals('Quick Start Tutorial', $artifacts[0]->getDisplayName());
    }

    public function testMavenArtifact() {
        $artifact = MavenArtifact::getMavenArtifact('connectivity-demos');
        $this->assertEquals('Connectivity Demos', $artifact->getDisplayName());
        $this->assertEquals('ch.ivyteam.ivy.project.demo', $artifact->getGroupId());
        $this->assertEquals('connectivity-demos', $artifact->getArtifactId());
        $this->assertEquals('/permalink/lib/dev/connectivity-demos.iar', $artifact->getPermalinkDev());
    }
}
