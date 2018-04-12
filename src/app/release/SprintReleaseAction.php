<?php
namespace app\release;

use Psr\Container\ContainerInterface;

class SprintReleaseAction
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function __invoke($request, $response, $args) {
        
        if (isset($args['file'])) {
            $file = $args['file'];
            return $response->withRedirect('/'.IVY_SPRINT_RELEASE_DIR_RELATIVE.'/' . $file);
        }
        
        
        $releaseInfo = ReleaseInfoRepository::getSprintRelease();
        
        
        $baseUrl = BASE_URL . '/download/sprint-release';
        
        // TODO Makes Permalinks sense?
        
        $permalinks = [
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
            ['url' => $baseUrl . '/AxonIvyDesigner-latest_Linux_x64.zip', 'name' => 'AxonIvyDesigner_Linux_x64'],
        ];
        
        
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyDesigner-latest_Linux_x64.zip">AxonIvyDesigner_Linux_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyDesigner-latest_MacOSX_x64.zip">AxonIvyDesigner_MacOSX_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyDesigner-latest_Windows_x64.zip">AxonIvyDesigner_Windows_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_Linux_x64.zip">AxonIvyEngine_Linux_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_OSGi_All_x64.zip">AxonIvyEngine_OSGi_All_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_OSGi_Slim_All_x64.zip">AxonIvyEngine_OSGi_Slim_All_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_OSGi_Windows_x64.zip">AxonIvyEngine_OSGi_Windows_x64</a></li>
//         <li><a href="https://developer.axonivy.com/download/sprint-release/AxonIvyEngine-latest_Windows_x64.zip">AxonIvyEngine_Windows_x64</a></li>
        
        // TODO Check p2 url
        
        return $this->container->get('view')->render($response, 'app/release/sprint-release.html', [
            'releaseInfo' => $releaseInfo,
            'sprintUrl' => $baseUrl,
            'sprintUrlP2' => $baseUrl . '/p2',
            'permalinks' => $permalinks
        ]);
    }
}


