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
}
