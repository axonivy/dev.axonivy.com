<?php
namespace app\devday;

class DevDayRepository
{
    public static function getLatestDevDay(): ?object {
        $devDays = self::getDevDays();
        $latestYear = '';
        foreach ($devDays as $devDay) {
            if (empty($latestYear) || $latestYear < $devDay->year) {
                $latestYear = $devDay->year;
            }
        }
        return self::getDevDay($latestYear);
    }
    
    public static function getDevDay($year): ?object {
        foreach (self::getDevDays() as $devDay) {
            if ($devDay->year == $year) {
                return $devDay;
            }
        }
        return null;
    }
    
    private static function getDevDays(): array {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'devdays.json'));
    }
}
