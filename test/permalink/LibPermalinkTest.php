<?php
namespace test\permalink;

use PHPUnit\Framework\TestCase;
use app\permalink\LibPermalink;

class LibPermalinkTest extends TestCase
{
    public function testParseLatestVersionFromXml() {
        $linker = new LibPermalink();
        $xml = file_get_contents(dirname(__FILE__) . '/maven-metadata.xml');
        $version = $linker->parseLatestVersionFromXml($xml);
        $this->assertEquals('7.3.0-SNAPSHOT', $version);
    }
    
    public function testParseVersionIdentifierFromXml() {
        $linker = new LibPermalink();
        $xml = file_get_contents(dirname(__FILE__) . '/maven-metadata-specific.xml');
        $version = $linker->parseVersionIdentifierFromXml($xml);
        $this->assertEquals('7.3.0-20181115.013605-5', $version);
    }
}
