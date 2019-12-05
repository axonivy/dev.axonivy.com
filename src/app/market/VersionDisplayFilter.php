<?php
namespace app\market;

interface VersionDisplayFilter
{
    function versionsToDisplay(Product $product): array;
}
