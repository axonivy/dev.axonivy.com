<?php
namespace app\tutorial\gettingstarted;

class TutorialRepository
{
    public static function getGettingStartedTutorial(string $name): ?object {
        foreach (self::getGettingStartedTutorials() as $tutorial) {
            if ($tutorial->id == $name) {
                return $tutorial;
            }
        }
        return null;
    }
    
    public static function getGettingStartedTutorialNextVideoUrl(string $name, string $stepNr) {
       return self::getGettingStartedTutorialStep($name, $stepNr + 1)->url;
    }
    
    public static function getGettingStartedTutorialStep(string $name, string $stepNr): ?object {
        $tutorial = self::getGettingStartedTutorial($name);
        if ($tutorial != null) {
            foreach ($tutorial->steps as $step) {
                if ($step->number == $stepNr) {
                    return $step;
                }
            }
        }
        return null;
    }
    
    private static function getGettingStartedTutorials(): array {
        $tutorials = json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'getting-started-tutorial.json'));
        self::enrichtStepsWithUrl($tutorials);
        return $tutorials;
    }
    
    private static function enrichtStepsWithUrl(array $tutorials) {
        foreach ($tutorials as $tutorial) {
            foreach ($tutorial->steps as $step) {
                $step->url = "/tutorial/getting-started/" . $tutorial->id . "/step-" . $step->number;
            }
        }
    }
}
