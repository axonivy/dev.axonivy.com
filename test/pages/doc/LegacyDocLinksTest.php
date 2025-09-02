<?php

namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LegacyDocLinksTest extends TestCase
{
  public function testRedirectEngineGuide()
  {
    AppTester::assertThatGet('/doc/latest/EngineGuideHtml')->redirect('/doc/8.0/en/EngineGuideHtml');
    AppTester::assertThatGet('/doc/8.0/EngineGuideHtml')->redirect('en/engine-guide/');

    AppTester::assertThatGet('/doc/latest/EngineGuideHtml/tools.html')->redirect('/doc/8.0/en/EngineGuideHtml/tools.html');
    AppTester::assertThatGet('/doc/8.0/EngineGuideHtml/tools.html')->ok(); // client-side redirect
  }

  public function testRedirectDesignerGuide()
  {
    AppTester::assertThatGet('/doc/latest/DesignerGuideHtml')->redirect('/doc/8.0/en/DesignerGuideHtml');
    AppTester::assertThatGet('/doc/8.0/DesignerGuideHtml')->redirect('en/designer-guide/');

    AppTester::assertThatGet('/doc/latest/DesignerGuideHtml/ivy.integration.html')->redirect('/doc/8.0/en/DesignerGuideHtml/ivy.integration.html');
    AppTester::assertThatGet('/doc/8.0/DesignerGuideHtml/ivy.integration.html')->ok(); // client-side redirect
  }

  public function testRedirectPublicAPI()
  {
    AppTester::assertThatGet('/doc/latest/PublicAPI')->redirect('/doc/8.0/en/PublicAPI');
    AppTester::assertThatGet('/doc/8.0/PublicAPI')->redirect('/doc/8.0/en/public-api');
    AppTester::assertThatGet('/doc/latest/PublicAPI/special-ivy-class.html')->redirect('/doc/8.0/en/PublicAPI/special-ivy-class.html');
    AppTester::assertThatGet('/doc/8.0/PublicAPI/special-ivy-class.html')->redirect('/doc/8.0/en/public-api/special-ivy-class.html');
  }
}
