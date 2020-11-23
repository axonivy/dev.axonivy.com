<?php
namespace app\pages\market;

use Slim\Exception\HttpNotFoundException;
use Slim\Views\Twig;
use app\domain\market\Market;

class ProductAction
{

    private Twig $view;
    
    public function __construct(Twig $view)
    {
        $this->view = $view;
    }

    public function __invoke($request, $response, $args) {
        $key = $args['key'] ?? '';
        $product = Market::getProductByKey($key);
        if ($product == null) {
            throw new HttpNotFoundException($request);
        }
        
        $uri = $request->getUri();
        $baseUri = $uri->getScheme() . '://' . $uri->getHost();

        $mavenProductInfo = $product->getMavenProductInfo();
        

        $version = $args['version'] ?? '';
        $mavenArtifactsAsDependency = [];
        $mavenArtifacts = [];
        $docArtifacts = [];
        
        if ($mavenProductInfo != null)
        {
            if (empty($version)) {
                $version = $mavenProductInfo->getLatestVersionToDisplay();
            } else if (!$mavenProductInfo->hasVersion($version)) {
                throw new HttpNotFoundException($request);
            }
            
            $mavenArtifacts = $mavenProductInfo->getMavenArtifactsForVersion($version);
            foreach ($mavenArtifacts as $artifact) {
                if ($artifact->getMakesSenseAsMavenDependency()) {
                    $mavenArtifactsAsDependency[] = $artifact;
                }
            }
            
            foreach ($mavenArtifacts as $artifact) {
                if ($artifact->isDocumentation()) {
                    $docArtifacts[] = $artifact;
                }
            }
        }
        
        $existingDocArtifacts = [];
        foreach ($docArtifacts as $docArtifact) {
            if ($docArtifact->docExists($version)) {
                $existingDocArtifacts[] = $docArtifact;
            }
        }
        
        return $this->view->render($response, 'market/product.twig', [
            'product' => $product,
            'baseUri' => $baseUri,
            'mavenProductInfo' => $mavenProductInfo,
            'mavenArtifacts' => $mavenArtifacts,
            'mavenArtifactsAsDependency' => $mavenArtifactsAsDependency,
            'docArtifacts' => $existingDocArtifacts,
            'selectedVersion' => $version
        ]);
    }
}
