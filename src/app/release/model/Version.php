<?php
namespace app\release\model;

class Version
{
    private $versionNumber;
    
    public function __construct(string $versionNumber)
    {
        $this->versionNumber = $versionNumber;
    }
    
    public static function isValidVersionNumber(string $versionNumber): bool
    {
        $number = str_replace('.' , '', $versionNumber);
        if (!is_numeric($number)) {
            return false;
        }
        return version_compare($versionNumber, '0.0.1', '>=') >= 0;
    }
    
    public function isLongTermSupportVersion(): bool
    {
        $v = explode('.', $this->versionNumber);
        return $v[1] == 0;
    }
    
    public function getVersionNumber(): string
    {
        return $this->versionNumber;
    }
    
    public function isEqualOrGreaterThan(string $versionNumber): bool
    {
        return version_compare($this->versionNumber, $versionNumber, '>=');
    }
    
    /**
     * e.g. 6, 7
     *
     * @return string
     */
    public function getMajorVersion(): string
    {
        $v = explode('.', $this->versionNumber);
        $v = array_slice($v, 0, 1);
        return implode('.', $v);
    }
    
    /**
     * e.g. 6.1 or 3.9
     *
     * @return string
     */
    public function getMinorVersion(): string
    {
        $v = explode('.', $this->versionNumber);
        $v = array_slice($v, 0, 2);
        return implode('.', $v);
    }
    
    /**
     * e.g. 6.1.2 or 3.9.6
     *
     * @return string
     */
    public function getBugfixVersion(): string
    {
        $v = explode('.', $this->versionNumber);
        $v = array_slice($v, 0, 3);
        return implode('.', $v);
    }
}
