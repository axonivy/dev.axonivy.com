<?php
namespace app\team;

class TeamRepository
{
    public static function getMembers(): array
    {
        return json_decode(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'members.json'));
    }
}
