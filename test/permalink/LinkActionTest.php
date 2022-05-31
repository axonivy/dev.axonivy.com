<?php

namespace test\permalink;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class LinkActionTest extends TestCase
{
  public function testRedirectUnknownLink()
  {
    AppTester::assertThatGet('/link/unknown')->notFound();
    AppTester::assertThatGet('/link/bla')->notFound();
    AppTester::assertThatGet('/link/b')->notFound();
  }

  public function testRedirectEmptyLink()
  {
    AppTester::assertThatGet('/link')->notFound();
  }
  
  public function testRedirectToDockerImage()
  {
      $dockerImageLink = 'https://github.com/axonivy/docker-image/';
      
      AppTester::assertThatGet('/link/docker-image')->redirect($dockerImageLink);
      AppTester::assertThatGet('/link/docker-image/master')->redirect($dockerImageLink);
      AppTester::assertThatGet('/link/docker-image/8.0')->redirect($dockerImageLink);
  }

  public function testRedirectToDockerSamples()
  {
    $prefix = 'https://github.com/axonivy/docker-samples/tree/master/';
    
    AppTester::assertThatGet('/link/docker-elasticsearch-cluster')->redirect($prefix . 'ivy-elasticsearch-cluster');
    AppTester::assertThatGet('/link/docker-elasticsearch')->redirect($prefix . 'ivy-elasticsearch');
    AppTester::assertThatGet('/link/docker-reverse-proxy-apache')->redirect($prefix . 'ivy-reverse-proxy-apache');
    AppTester::assertThatGet('/link/docker-reverse-proxy-nginx')->redirect($prefix . 'ivy-reverse-proxy-nginx');
    AppTester::assertThatGet('/link/docker-scaling-haproxy')->redirect($prefix . 'ivy-scaling-haproxy');
    AppTester::assertThatGet('/link/docker-scaling-nginx')->redirect($prefix . 'ivy-scaling-nginx');
    AppTester::assertThatGet('/link/docker-secrets')->redirect($prefix . 'ivy-secrets');
    
    AppTester::assertThatGet('/link/docker-samples')->redirect('https://github.com/axonivy/docker-samples/');
  }
  
  public function testRedirectToDemos()
  {
      $prefixDemos = 'https://github.com/axonivy-market/demo-projects/';
      
      AppTester::assertThatGet('/link/demos')->redirect($prefixDemos);
      AppTester::assertThatGet('/link/demos/master')->redirect($prefixDemos);
      AppTester::assertThatGet('/link/demos/8.0')->redirect($prefixDemos);
      AppTester::assertThatGet('/link/demos-connect-secure-service-java/master')->redirect($prefixDemos . 'blob/master/connectivity/connectivity-demos/src/com/axonivy/connectivity/rest/provider/SecureService.java');
      AppTester::assertThatGet('/link/demos-hd-color-custom-css/master')->redirect($prefixDemos . 'blob/master/html-dialog/html-dialog-demos/webContent/layouts/styles/color-customize.css#L1-L54');
      AppTester::assertThatGet('/link/demos-hd-color-custom-css/9.2')->redirect($prefixDemos . 'blob/master/html-dialog/html-dialog-demos/webContent/layouts/styles/color-customize.css#L1-L54');
  }
  
  public function testRedirectToBuildPlugin()
  {
      $buildPluginLink = 'https://github.com/axonivy/project-build-plugin/';
      
      AppTester::assertThatGet('/link/build-plugin')->redirect($buildPluginLink);
      AppTester::assertThatGet('/link/build-plugin/master')->redirect($buildPluginLink);
      AppTester::assertThatGet('/link/build-plugin/8.0')->redirect($buildPluginLink);
  }
  
  public function testRedirectToWebtester()
  {
      $webtesterLink = 'https://github.com/axonivy/web-tester/';
      
      AppTester::assertThatGet('/link/webtester')->redirect($webtesterLink);
      AppTester::assertThatGet('/link/webtester/master')->redirect($webtesterLink);
      AppTester::assertThatGet('/link/webtester/8.0')->redirect($webtesterLink);
  }
  
  public function testRedirectToBuildExamples()
  {
      $prefixBuildExamples = 'https://github.com/axonivy/project-build-examples/';
      
      AppTester::assertThatGet('/link/build-examples')->redirect($prefixBuildExamples . 'tree/master');
      AppTester::assertThatGet('/link/build-examples/master')->redirect($prefixBuildExamples . 'tree/master');
      AppTester::assertThatGet('/link/build-examples/8.0')->redirect($prefixBuildExamples . 'tree/release/8.0');

      AppTester::assertThatGet('/link/build-examples-web-test-pom/master')->redirect($prefixBuildExamples . 'blob/master/compile-test/pom.xml');
      AppTester::assertThatGet('/link/build-examples-unit-tests/master')->redirect($prefixBuildExamples . 'blob/master/compile-test/crmTests/src_test/ch/ivyteam/test');
      AppTester::assertThatGet('/link/build-examples-web-test/master')->redirect($prefixBuildExamples . 'blob/master/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java');
      AppTester::assertThatGet('/link/build-examples-web-test-base/master')->redirect($prefixBuildExamples . 'blob/master/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestRegistrationFormIT.java#L22-L39');
      AppTester::assertThatGet('/link/build-examples-web-test-select/master')->redirect($prefixBuildExamples . 'blob/master/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java#L114-L156');
      AppTester::assertThatGet('/link/build-examples-web-test-condition/master')->redirect($prefixBuildExamples . 'blob/master/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java#L164-L181');

      AppTester::assertThatGet('/link/build-examples-web-test-pom/8.0')->redirect($prefixBuildExamples . 'blob/release/8.0/compile-test/pom.xml');
      AppTester::assertThatGet('/link/build-examples-unit-tests/8.0')->redirect($prefixBuildExamples . 'blob/release/8.0/compile-test/crmTests/src_test/ch/ivyteam/test');
      AppTester::assertThatGet('/link/build-examples-web-test/8.0')->redirect($prefixBuildExamples . 'blob/release/8.0/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java');
      AppTester::assertThatGet('/link/build-examples-web-test-base/8.0')->redirect($prefixBuildExamples . 'blob/release/8.0/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestRegistrationFormIT.java#L22-L39');
      AppTester::assertThatGet('/link/build-examples-web-test-select/8.0')->redirect($prefixBuildExamples . 'blob/release/8.0/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java#L114-L156');
      AppTester::assertThatGet('/link/build-examples-web-test-condition/8.0')->redirect($prefixBuildExamples . 'blob/release/8.0/compile-test/crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java#L164-L181');
  }
}
