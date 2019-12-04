<?php 
require __DIR__ . '/../../../vendor/autoload.php';

use app\permalink\MavenArtifactRepository;
use app\Config;

Config::initConfig();

foreach (MavenArtifactRepository::getDocs() as $doc) {
    foreach ($doc->getVersions() as $version) {
        $targetDir = DOC_DIRECTORY_THIRDPARTY . '/' . $doc->getDocSubFolder($version);
        if (!file_exists($targetDir)) {
            echo '/home/axonivya/data/doc-cache/script/clone-doc.sh ' . $doc->getUrl($version) . ' ' . $targetDir . "\n";
            exec('~/script/clone-doc.sh ' . $doc->getUrl($version) . ' ' . $targetDir);
        }
    }
}
