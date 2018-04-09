<?php
namespace app\codecamp;

use Psr\Container\ContainerInterface;
use Slim\Exception\NotFoundException;

class CodeCampAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        if (!isset($args['year']))
        {
            $year = CodeCampRepository::getLatestCodeCampYear();
            if ($year == null) {
                throw new NotFoundException($request, $response);
            }
            return $response->withStatus(302)->withHeader('Location', '/codecamp/' . $year);
        }
        
        
        $year = $args['year'];
        $codeCampTeams = CodeCampRepository::getCodeCampTeams($year);
        if ($codeCampTeams == null) {
            throw new NotFoundException($request, $response);
        }
        return $this->container->get('view')->render($response, 'app/codecamp/codecamp.html', ['year' => $year, 'teams' => $codeCampTeams]);
    }
}
