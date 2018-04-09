<?php
namespace app\codecamp;

class CodeCampRepository
{
    public static function getLatestCodeCampYear(): ?int {
        $years = self::getCodeCampYears();
        return max($years);
    }
    
    public static function getCodeCampTeams($year): ?array {
        foreach (self::getCodeCampYears() as $y) {
            if ($y == $year) {
                return self::readJsons($y);
            }
        }
        return null;
    }
    
    private static function getCodeCampYears(): array {
        $years = [];
        $files = scandir(__DIR__);
        foreach ($files as $file) {
            if (is_dir(__DIR__ . DIRECTORY_SEPARATOR . $file) && is_numeric($file)) {
                $years[] = basename($file);
            }
        }
        return $years;
    }
    
    private static function readJsons($year): array {
        $folder = __DIR__ . DIRECTORY_SEPARATOR . $year;
        $files = scandir($folder);
        $codeCampTeams = [];
        foreach ($files as $file) {
            $codeCampTeams[] = json_decode(file_get_contents($folder . DIRECTORY_SEPARATOR . $file));
        }
        return $codeCampTeams;
    }
    
    private static function getCodeCamp(): array {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'devdays.json'));
    }
    
}
