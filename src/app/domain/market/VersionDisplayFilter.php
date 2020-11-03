<?php
namespace app\domain\market;

interface VersionDisplayFilter
{
    function versionsToDisplay(MavenProductInfo $info): array;
}
