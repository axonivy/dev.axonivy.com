<?php 
require __DIR__ . '/../../../vendor/autoload.php';

use app\permalink\MavenArtifactRepository;
use app\Config;

Config::initConfig();

foreach (MavenArtifactRepository::getDocs() as $doc) {
    foreach ($doc->getVersions() as $version) {
        $targetDir = DOC_DIRECTORY_THIRDPARTY . '/' . $doc->getDocSubFolder($version);
        if (!file_exists($targetDir)) {
            $cmd = CLONE_DOC_SCRIPT. ' ' . $doc->getUrl($version) . ' ' . $targetDir;
            exec($cmd);
        }
    }
}
