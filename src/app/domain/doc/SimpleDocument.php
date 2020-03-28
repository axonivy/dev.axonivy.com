<?php
namespace app\domain\doc;

class SimpleDocument
{
    private $name;
    private $path;
    private $url;
    
    public function __construct(string $name, string $path, string $url)
    {
        $this->name = $name;
        $this->path = $path;
        $this->url = $url;
    }
    
    public function getName(): string
    {
        return $this->name;
    }
    
    public function getUrl(): string
    {
        return $this->url;
    }
    
    private function getPath()
    {
        return $this->path;
    }
    
    private function exists(): bool
    {
        return file_exists($this->path);
    }
    
}
