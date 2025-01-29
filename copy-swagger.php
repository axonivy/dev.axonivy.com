<?php

// Define paths
$vendorDir = __DIR__ . '/vendor/swagger-api/swagger-ui/dist';
$webDir = __DIR__ . '/src/web/swagger';

// Check if the source directory exists
if (!is_dir($vendorDir)) {
    die("Source directory does not exist: $vendorDir\n");
}

// Ensure the target directory exists
if (!is_dir($webDir)) {
    mkdir($webDir, 0777, true);
}

// Copy files from vendor to web directory
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($vendorDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::CATCH_GET_CHILD
);

foreach ($iterator as $file) {
    $destination = $webDir . DIRECTORY_SEPARATOR . $iterator->getSubIterator();

    if ($file->isDir()) {
        // Ensure subdirectories exist
        if (!is_dir($destination)) {
            mkdir($destination, 0777, true);
        }
        continue;
    } 
    if (str_ends_with($file->getRealPath(), ".html")){
        // avoid browsable default swagger index.html (serving petstore)
        continue;
    }
    if (str_ends_with($file->getRealPath(), ".js.map")){
        // no bulky js.map required
        continue;
    }
    if (str_contains($file->getRealPath(), "-es-")){
        // no bulky -es- duplicates
        continue;
    }
    copy($file->getRealPath(), $destination);
}

echo "Resources copied successfully from '$vendorDir' to '$webDir'.\n";
