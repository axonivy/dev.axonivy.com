<?php 
require __DIR__ . '/../../vendor/autoload.php';

use app\Config;
use app\domain\maven\MavenArtifactRepository;

foreach (MavenArtifactRepository::getDocs() as $doc) {
    foreach ($doc->getVersions() as $version) {
        $targetDir = Config::DOC_DIRECTORY_THIRDPARTY . '/' . $doc->getDocSubFolder($version);
        if (! file_exists($targetDir)) {
            $cmd = Config::CLONE_DOC_SCRIPT . ' ' . $doc->getUrl($version) . ' ' . $targetDir;
            echo "Execute: " . $cmd . "\n";
            exec($cmd);
        } else {
            echo "Already cached: " . $targetDir . "\n";
        }
    }
}
