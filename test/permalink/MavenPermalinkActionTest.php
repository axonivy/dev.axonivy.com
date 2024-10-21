<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class MavenPermalinkActionTest extends TestCase
{
  public function testPermalink_dev()
  {
    AppTester::assertThatGet('/maven/com.axonivy.demo/ivy-demos-app/dev/zip')
    ->redirectStartsWith("https://maven.axonivy.com/com/axonivy/demo/ivy-demos-app/");
  }

  public function testPermalink_latest()
  {
    AppTester::assertThatGet('/maven/com.axonivy.demo/ivy-demos-app/latest/zip')
      ->redirectStartsWith("https://maven.axonivy.com/com/axonivy/demo/ivy-demos-app/");
  }
     

  public function testPermalink_specificVersion_snapshot()
  {    
    AppTester::assertThatGet('/maven/com.axonivy.demo/ivy-demos-app/9.4.0-SNAPSHOT/zip')
      ->redirectStartsWith("https://maven.axonivy.com/com/axonivy/demo/ivy-demos-app/9.4.0-SNAPSHOT/ivy-demos-app-9.4.0-");
  }

  public function testPermalink_specificVersion_release()
  {    
    AppTester::assertThatGet('/maven/com.axonivy.demo/ivy-demos-app/10.0.0/zip')
      ->redirect("https://maven.axonivy.com/com/axonivy/demo/ivy-demos-app/10.0.0/ivy-demos-app-10.0.0.zip");
  }

  public function testPermalink_minorVersion()
  {
    AppTester::assertThatGet('/maven/com.axonivy.demo/ivy-demos-app/10.0/zip')
      ->redirectStartsWith("https://maven.axonivy.com/com/axonivy/demo/ivy-demos-app/10.0");
  }
}
