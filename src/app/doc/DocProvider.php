<?php
namespace app\doc;

class DocProvider
{
    public static function getNewAndNoteworthyHtml(): string
    {
        $parsedown = new \Parsedown();        
        return $parsedown->text(file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'NewAndNoteworthy.md'));
    }
    
}

