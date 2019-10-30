<?php
namespace app\permalink;

use Slim\Exception\NotFoundException;

class LibPermalink
{
    public function __invoke($request, $response, $args) {
        $version = $args['version'];
        if ($version != 'dev') {
            throw new NotFoundException($request, $response);
        }
        
        $name = $args['name'] ?? ''; // e.g demo-app.zip
        
        $type = pathinfo($name, PATHINFO_EXTENSION); // e.g. zip 
        $filename = pathinfo($name, PATHINFO_FILENAME); // e.g. demo-app
        
        $mavenArtifact = MavenArtifact::getMavenArtifact($filename, $type);
        if ($mavenArtifact == null) {
            throw new NotFoundException($request, $response);
        }

        $url = $mavenArtifact->getDevUrl();
        return $response->withRedirect($url);
    }
}
