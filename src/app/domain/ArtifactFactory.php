<?php
namespace app\domain;

use app\domain\util\StringUtil;
use app\Config;

class ArtifactFactory
{
    public static function create(string $folder): array
    {
        $versionNumber = basename($folder);
        $fileNames = glob($folder . '/downloads/*.{zip,deb}', GLOB_BRACE);
        
        $artifacts = array_map(fn (string $filename) => ArtifactFactory::fromFilename($versionNumber, $filename), $fileNames);
        
        if (self::isDockerAvailableForVersion($versionNumber)) {
            $artifacts[] = self::createDockerArtifact($versionNumber);
        }
        return $artifacts;
    }
    
    private static function fromFilename(string $folderName, string $filename): Artifact
    {
        return self::createParser($filename)->toArtifact($folderName, $filename);
    }
    
    private static function createParser($filename): ArtifactFilenameParser
    {
        if (StringUtil::endsWith($filename, 'deb')) {
            return new DebianArtifactFilenameParser();
        } else {
            return new DefaultArtifactFilenameParser();
        }
    }
    
    private static function createDockerArtifact($versionNumber): Artifact
    {
        return new Artifact(
            Config::DOCKER_IMAGE_ENGINE . ":$versionNumber",
            Artifact::PRODUCT_NAME_ENGINE,
            $versionNumber,
            Artifact::TYPE_DOCKER,
            Artifact::ARCHITECTURE_X64,
            '',
            false,
            '',
            Config::DOCKER_HUB_IMAGE_URL
        );
    }
    
    private static function isDockerAvailableForVersion(string $versionNumber): bool
    {
        if (version_compare($versionNumber, Config::DOCKER_IMAGE_SINCE_VERSION) >= 0) {
            return true;
        }
        if (!is_numeric($versionNumber) && $versionNumber != 'nightly-7') {
            return true;
        }
        return false;
    }
}

interface ArtifactFilenameParser
{
    public function toArtifact(string $folderName, string $originalFilename): Artifact;
}

class DefaultArtifactFilenameParser implements ArtifactFilenameParser
{
    public function toArtifact(string $folderName, string $originalFilename): Artifact
    {
        $filename = pathinfo($originalFilename, PATHINFO_FILENAME); // AxonIvyDesigner6.4.0.52683_Windows_x86 or AxonIvyDesigner6.4.0.52683_Osgi_All_x86
        $fileNameArray = explode('_', $filename);
        $architecture = end($fileNameArray); // x86
        
        $typeParts = array_slice($fileNameArray, 1, - 1); // [Windows], [Linux], [All] or [Slim, All]
        $type = implode(' ', $typeParts); // 'Windows', 'Linux', 'All' or 'Slim All'
        $shortType = self::calculateShortType($typeParts); // '-windows', '-linux', '' or '-slim' (-all is removed)
        
        $productNameVersion = $fileNameArray[0]; // AxonIvyDesigner6.4.0.52683
        $productNameVersionArray = preg_split('/(?=\d)/', $productNameVersion, 2);
        $originaProductNamePrefix = $productNameVersionArray[0];
        $productName = self::calculateProductName($originaProductNamePrefix);
        $versionNumber = $productNameVersionArray[1];
        
        $mavenPluginComp = $productName == Artifact::PRODUCT_NAME_ENGINE;
        $fileExtension = pathinfo($originalFilename, PATHINFO_EXTENSION);
        $permalinkName = 'axonivy-' . $productName . $shortType . '.' . $fileExtension;
        $permalink = ArtifactLinkFactory::permalink("$folderName/$permalinkName");
        $downloadUrl = ArtifactLinkFactory::cdn("$folderName/" . basename($originalFilename));

        return new Artifact(
            basename($originalFilename),
            $productName,
            $versionNumber,
            $type,
            $architecture,
            $shortType,
            $mavenPluginComp,
            $permalink,
            $downloadUrl
        );
    }
    
    private static function calculateShortType(array $typeParts): string
    {
        $shortType = '-' . implode('-', $typeParts);
        $shortType = strtolower($shortType);
        $shortType = str_replace('-all', '', $shortType);
        return $shortType;
    }
    
    private static function calculateProductName(string $fullName): string
    {
        $fullNameLower = strtolower($fullName);
        if (StringUtil::contains($fullNameLower, 'engine')) {
            return Artifact::PRODUCT_NAME_ENGINE;
        }
        
        if (StringUtil::contains($fullNameLower, 'designer')) {
            return Artifact::PRODUCT_NAME_DESIGNER;
        }
        
        $productName = str_replace('AxonIvy', '', $fullName);
        $productName = str_replace('XpertIvy', '', $productName);
        $productName = str_replace('Server', 'Engine', $productName);
        return $productName;
    }
}

class DebianArtifactFilenameParser implements ArtifactFilenameParser
{
    /**
     * $originalFilename: e.g. axonivy-engine-7x_7.2.0.60027.deb
     */
    public function toArtifact(string $folderName, string $originalFilename): Artifact
    {
        $filename = pathinfo($originalFilename, PATHINFO_FILENAME); // e.g. axonivy-engine-7x_7.2.0.60027
        $fileNameArray = explode('_', $filename); // e.g ['axonivy-engine-7x', '7.2.0.60027']
        $versionNumber = end($fileNameArray); // e.g. '7.2.0.60027'
        $permalink = ArtifactLinkFactory::permalink("$folderName/axonivy-engine.deb");
        $downloadUrl = ArtifactLinkFactory::cdn("$folderName/" . basename($originalFilename));

        return new Artifact(
            basename($originalFilename),
            Artifact::PRODUCT_NAME_ENGINE,
            $versionNumber,
            Artifact::TYPE_DEBIAN,
            Artifact::ARCHITECTURE_X64,
            '',
            false,
            $permalink,
            $downloadUrl
        );
    }
}

class ArtifactLinkFactory
{
    public static function permalink($path): string
    {
        $basePermalink = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
        return $basePermalink . '/permalink/' . $path;
    }
    
    public static function cdn($path): string
    {
        return Config::CDN_URL . "/$path";
    }
}
