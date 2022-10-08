<?php
namespace test\domain\listing;

use PHPUnit\Framework\TestCase;
use test\AppTester;
use app\domain\listing\BuildJobUrlCrawler;
use DOMDocument;

class BuildJobUrlCrawlerTest extends TestCase
{

  public function testParse()
  {
    $crawler = new BuildJobUrlCrawler("https://anyurl/");
    
    $dom = new DOMDocument();
    $dom->loadHTMLFile(dirname(__FILE__) . "/product-build.html");

    $urls = $crawler->parse($dom);
    $this->assertEquals(2, sizeof($urls));
    $this->assertEquals("https://anyurl/job/master/lastSuccessfulBuild/", $urls[0]);
    $this->assertEquals("https://anyurl/job/release%252F8.0/lastSuccessfulBuild/", $urls[1]);
  }
}
