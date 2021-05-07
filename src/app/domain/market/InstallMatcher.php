<?php
namespace app\domain\market;

interface InstallMatcher
{
  function match(MavenProductInfo $info, string $version): string;
}
