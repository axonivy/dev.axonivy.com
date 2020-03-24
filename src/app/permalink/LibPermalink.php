<?php
namespace app\permalink;

use Slim\Exception\HttpNotFoundException;
use app\util\Redirect;

class LibPermalink
{
    public function __invoke($request, $response, $args) {
        $version = $args['version'];
        if ($version != 'dev') {
            throw new HttpNotFoundException($request);
        }
        
        $name = $args['name'] ?? ''; // e.g demo-app.zip
        
        $type = pathinfo($name, PATHINFO_EXTENSION); // e.g. zip 
        $filename = pathinfo($name, PATHINFO_FILENAME); // e.g. demo-app
        
        $mavenArtifact = MavenArtifactRepository::getMavenArtifact($filename, $type);
        if ($mavenArtifact == null) {
            throw new HttpNotFoundException($request);
        }

        $url = $mavenArtifact->getDevUrl();
        return Redirect::to($response, $url);
    }
}
