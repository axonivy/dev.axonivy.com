<?php
namespace app\release\model;

use app\util\StringUtil;
use app\util\ArrayUtil;

class PermalinkHelper
{
    public static function findArtifact($artifacts, $file): ?Artifact
    {
        if (PermalinkHelper::isFileAPermlink($file)) {
            return PermalinkHelper::findArtifactForPermalink($artifacts, $file);
        }
        return ArrayUtil::getFirstElementOrNull(array_filter($artifacts, function (Artifact $a) { return $a->getFileName() == $file; }));
    }
    
    private static function isFileAPermlink($permalinkFile): bool
    {
        return preg_match('/AxonIvy(.+)-latest(.+)/', $permalinkFile);
    }
    
    private static function findArtifactForPermalink($artifacts, $permalinkFile): ?Artifact
    {
        $startsAndEndsWith = explode('-latest', $permalinkFile);
        $startsWith = $startsAndEndsWith[0];
        $endsWith = $startsAndEndsWith[1];
        
        foreach ($artifacts as $artifact) {
            if (StringUtil::startsWith($artifact->getFileName(), $startsWith)) {
                if (StringUtil::endsWith($artifact->getFileName(), $endsWith)) {
                    return $artifact;
                }
            }
        }
        
        return null;
    }
    
}