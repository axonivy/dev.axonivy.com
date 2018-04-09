<?php
namespace app\feature;

class FeatureRepository
{
    public static function getPromotedFeatures(): array
    {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'promoted-features.json'));
    }
}
