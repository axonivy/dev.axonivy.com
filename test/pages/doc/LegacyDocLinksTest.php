<?php

namespace test\pages\doc;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LegacyDocLinkTets extends TestCase
{
  public function testRedirectEngineGuide()
  {
    AppTester::assertThatGet('/doc/latest/EngineGuideHtml')->redirect('/doc/8.0/EngineGuideHtml');
    AppTester::assertThatGet('/doc/8.0/EngineGuideHtml')->redirect('engine-guide/');

    AppTester::assertThatGet('/doc/latest/EngineGuideHtml/tools.html')->redirect('/doc/8.0/EngineGuideHtml/tools.html');
    AppTester::assertThatGet('/doc/8.0/EngineGuideHtml/tools.html')->ok(); // client-side redirect
  }

  public function testRedirectDesignerGuide()
  {
    AppTester::assertThatGet('/doc/latest/DesignerGuideHtml')->redirect('/doc/8.0/DesignerGuideHtml');
    AppTester::assertThatGet('/doc/8.0/DesignerGuideHtml')->redirect('designer-guide/');

    AppTester::assertThatGet('/doc/latest/DesignerGuideHtml/ivy.integration.html')->redirect('/doc/8.0/DesignerGuideHtml/ivy.integration.html');
    AppTester::assertThatGet('/doc/8.0/DesignerGuideHtml/ivy.integration.html')->ok(); // client-side redirect
  }

  public function testRedirectPublicAPI()
  {
    AppTester::assertThatGet('/doc/latest/PublicAPI')->redirect('/doc/8.0/PublicAPI');
    AppTester::assertThatGet('/doc/8.0/PublicAPI')->redirect('/doc/8.0/public-api');
    AppTester::assertThatGet('/doc/latest/PublicAPI/special-ivy-class.html')->redirect('/doc/8.0/PublicAPI/special-ivy-class.html');
    AppTester::assertThatGet('/doc/8.0/PublicAPI/special-ivy-class.html')->redirect('/doc/8.0/public-api/special-ivy-class.html');
  }
}
