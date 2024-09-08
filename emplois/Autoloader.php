<?php

namespace App;

class Autoloader
{
    static public function register()
    {
        spl_autoload_register([
            __CLASS__, 'autoload'
        ]);
    }

    static public function autoload($fqcn)
    {
        $fqcn = str_replace(__NAMESPACE__ . '\\', '', $fqcn);
        $fqcn = str_replace('\\', '/', $fqcn) . '.php';
        $file = __DIR__ . '/' . $fqcn;

        if (file_exists($file)) {
            require_once $file;
        }
    }
}
