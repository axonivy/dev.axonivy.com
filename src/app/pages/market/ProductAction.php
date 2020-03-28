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
        
        $version = $args['version'] ?? '';
        if (empty($version)) {
            $version = $product->getLatestVersionToDisplay();
        } else if (!$product->hasVersion($version)) {
           throw new HttpNotFoundException($request);
        }
        
        $mavenArtifacts = $product->getMavenArtifactsForVersion($version);
        
        $mavenArtifactsAsDependency = [];
        foreach ($mavenArtifacts as $artifact) {
            if ($artifact->getMakesSenseAsMavenDependency()) {
                $mavenArtifactsAsDependency[] = $artifact;
            }
        }

        $docArtifacts = [];
        foreach ($mavenArtifacts as $artifact) {
            if ($artifact->isDocumentation()) {
                $docArtifacts[] = $artifact;
            }
        }

        return $this->view->render($response, 'market/product.twig', [
            'product' => $product,
            'mavenArtifacts' => $mavenArtifacts,
            'mavenArtifactsAsDependency' => $mavenArtifactsAsDependency,
            'docArtifacts' => $docArtifacts,
            'selectedVersion' => $version
        ]);
    }
}
