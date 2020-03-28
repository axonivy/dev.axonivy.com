<?php
namespace app\domain\market;

interface VersionDisplayFilter
{
    function versionsToDisplay(Product $product): array;
}
