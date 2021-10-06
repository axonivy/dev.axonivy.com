<?php

namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use Slim\Psr7\Response;
use app\domain\util\Redirect;

class LinkAction
{
  public function __invoke($request, Response $response, $args)
  {
    $linkKey = $args['key'];
    $branchVersion = $args['branchVersion'] ?? 'master';
    $redirectUrl = $this->getRedirectUrl($request, $linkKey, $branchVersion);
    return Redirect::to($response, $redirectUrl);
  }

  private function getRedirectUrl($request, $linkKey, $branchVersion)
  {
    $demosPrefix = 'https://github.com/axonivy-market/demo-projects/';
    $demosBlobPrefix = $demosPrefix . 'blob/master/';
    
    $samplesPrefix = 'https://github.com/axonivy/docker-samples/';
    $samplesTreePrefix = $samplesPrefix . 'tree/master/';
    
    $buildExamplePrefix = 'https://github.com/axonivy/project-build-examples/';
    $buildExampleBlobPrefix = $buildExamplePrefix . 'blob/' . $branchVersion .'/compile-test/';
    
    $redirects = [
        'docker-image' => 'https://github.com/axonivy/docker-image/',
        
        'docker-samples' => $samplesPrefix,
        'docker-elasticsearch-cluster' => $samplesTreePrefix . 'ivy-elasticsearch-cluster',
        'docker-elasticsearch' => $samplesTreePrefix . 'ivy-elasticsearch',
        'docker-reverse-proxy-apache' => $samplesTreePrefix . 'ivy-reverse-proxy-apache',
        'docker-reverse-proxy-nginx' => $samplesTreePrefix . 'ivy-reverse-proxy-nginx',
        'docker-scaling-haproxy' => $samplesTreePrefix . 'ivy-scaling-haproxy',
        'docker-scaling-nginx' => $samplesTreePrefix . 'ivy-scaling-nginx',
        'docker-secrets' => $samplesTreePrefix . 'ivy-secrets',
        'docker-tracing-jaeger' => $samplesTreePrefix . 'ivy-tracing-jaeger',
        
        'demos' => $demosPrefix,
        'demos-connect-secure-service-java' => $demosBlobPrefix . 'connectivity/connectivity-demos/src/com/axonivy/connectivity/rest/provider/SecureService.java',
        'demos-hd-color-custom-css' => $demosBlobPrefix . 'html-dialog/html-dialog-demos/webContent/layouts/styles/color-customize.css#L1-L54',
        
        'build-plugin' => 'https://github.com/axonivy/project-build-plugin/',
        
        'webtester' => 'https://github.com/axonivy/web-tester/',

        'market-contribute' => 'https://github.com/axonivy/market/wiki/c0-Contribute',
        
        'build-examples' => $buildExamplePrefix . 'tree/' . $branchVersion,
        'build-examples-test-project' => $buildExampleBlobPrefix,
        'build-examples-web-test-pom' => $buildExampleBlobPrefix . 'pom.xml',
        'build-examples-unit-tests' => $buildExampleBlobPrefix . 'crmTests/src_test/ch/ivyteam/test',
        'build-examples-web-test' => $buildExampleBlobPrefix . 'crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java',
        'build-examples-web-test-base' => $buildExampleBlobPrefix . 'crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestRegistrationFormIT.java#L22-L39',
        'build-examples-web-test-select' => $buildExampleBlobPrefix . 'crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java#L114-L156',
        'build-examples-web-test-condition' => $buildExampleBlobPrefix . 'crmIntegrationTests/src_test/ch/ivyteam/integrationtest/WebTestOrderFormIT.java#L164-L181',
    ];

    $newPage = $redirects[$linkKey] ?? '';
    if (empty($newPage)) {
        throw new HttpNotFoundException($request);
    }
    return $newPage;
  }
}
