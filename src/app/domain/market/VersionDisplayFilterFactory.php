<?php
namespace app\domain\market;

use app\domain\util\StringUtil;

class VersionDisplayFilterFactory
{
    public function createShowAll(): VersionDisplayFilter
    {
        return new VersionDisplayFilterShowAll();
    }
    
    public function createHideSnapshots(): VersionDisplayFilter
    {
        return new VersionDisplayFilterHideSnapshots();
    }
    
    public function createHidePortalSprintReleases(): VersionDisplayFilter
    {
        return new VersionDisplayFilterHidePortalSprintReleases();
    }
}

class VersionDisplayFilterShowAll implements VersionDisplayFilter
{

    public function versionsToDisplay(Product $product): array
    {
        return $product->getVersions();
    }
}

class VersionDisplayFilterHideSnapshots implements VersionDisplayFilter
{

    public function versionsToDisplay(Product $product): array
    {
        $versions = [];
        foreach ($product->getVersions() as $v) {
            if (!StringUtil::contains($v, '-SNAPSHOT')) {
                $versions[] = $v;
            }
        }
        return $versions;
    }
}

class VersionDisplayFilterHidePortalSprintReleases implements VersionDisplayFilter
{

    public function versionsToDisplay(Product $product): array
    {
        $versionsToDisplay = [];
        
        $allVersions = $product->getVersions();
        $highesSprintReleases = [];
        foreach ($allVersions as $v) {
            if ($v == '1.0.0.0' || $v == '2.0.0.0') {
                continue;
            }

            if (StringUtil::contains($v, '-m')) { // hide sprint releases (maven milestone releases)
                continue;
            }

            $splittedVersion = explode('.', $v);
            if (count($splittedVersion) == 4) // old one with sprint release number in third 7.1.162.3
            {
                $majorVersion = $splittedVersion[0];
                $minorVersion = $splittedVersion[1];
                $key = $majorVersion . '.' . $minorVersion;
                $value = $splittedVersion[2] . '.' . $splittedVersion[3];
                if (isset($highesSprintReleases[$key]))
                {
                    if (version_compare($value, $highesSprintReleases[$key]) > 0)
                    {
                        $highesSprintReleases[$key] = $value;
                    }
                }
                else
                {
                    $highesSprintReleases[$key] = $value;
                }
            }
            else
            {
                // new version style 8.0.0
                $versionsToDisplay[] = $v;
            }
                 
        }

        foreach ($highesSprintReleases as $key => $value)
        {
            $versionsToDisplay[] = $key . '.' . $value;
        }
        return $versionsToDisplay;
    }
}