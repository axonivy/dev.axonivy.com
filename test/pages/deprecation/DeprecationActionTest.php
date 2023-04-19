<?php

namespace test\pages\deprecation;

use PHPUnit\Framework\TestCase;
use test\AppTester;

class DeprecationActionTest extends TestCase
{
    
    public function testRender()
    {
        AppTester::assertThatGet('/features/deprecation')
        ->ok()
        ->bodyContains('<h1>Deprecation and Removal</h1>');
    }
    
    public function testRender_RIAFeature()
    {
        AppTester::assertThatGet('/features/deprecation')
        ->ok()
        ->bodyContainsIgnoreWhitespaces(
          '<tr>
            <td>
              <a href="/doc/7.0/DesignerGuideHtml/ivy.userinterface.html#ivy-richdialogs">RIA / Rich Dialog</a> 
              <span title="The rich dialog technology stack has been removed. Use html dialog to implement user interfaces." class="deprecation-info"></span>
            </td>
            <td><a href="/doc/9.3/designer-guide/user-interface/user-dialogs/html-dialogs.html">Html Dialog</a></td>
            <td class="deprecation-icon"><span class=""></span></td>
            <td class="deprecation-icon"><span class="deprecation-released"></span></td>
            <td class="deprecation-icon"><span class="deprecation-ok"></span></td>
            <td class="deprecation-icon"><span class="deprecation-ok"></span></td>
            <td class="deprecation-icon"><span class="deprecation-deprecated"></span></td>
            <td class="deprecation-icon"><span class="deprecation-removed"></span></td>
            <td class="deprecation-icon"><span class=""></span></td>
            <td class="deprecation-icon"><span class=""></span></td>
          </tr>');
    }

    public function testRender_featureDeprecation()
    {
        AppTester::assertThatGet('/features/deprecation')
          ->ok()
          ->bodyContainsIgnoreWhitespaces('<span title="The Java library Guava is provided currently on the ivy project classpath.');
    }

    public function testRender_Versions()
    {
        AppTester::assertThatGet('/features/deprecation')
        ->ok()
        ->bodyContainsIgnoreWhitespaces(
            '<tr class="versions">
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>10</th>
              <th>11</th>
            </tr>');
    }
}
