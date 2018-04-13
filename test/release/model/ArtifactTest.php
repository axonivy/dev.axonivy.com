<?php
namespace test\release\model;

use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use app\release\model\Artifact;

class ArtifactTest extends TestCase
{
    public function testFilename()
    {
        $artifact = new Artifact('filename', 'downloadurl', 'permalink');
        Assert::assertEquals('filename', $artifact->getFileName());
    }
    
    public function testDownloadUrl()
    {
        $artifact = new Artifact('filename', 'downloadurl', 'permalink');
        Assert::assertEquals('downloadurl', $artifact->getDownloadUrl());
    }
    
    public function testPermalink()
    {
        $artifact = new Artifact('filename', 'downloadurl', 'AxonIvyEngine7.0.1.56047.S8_All_x64.zip');
        Assert::assertEquals('AxonIvyEngine7.0.1.56047.S8_All_x64.zip', $artifact->getPermalink());
    }
    
}