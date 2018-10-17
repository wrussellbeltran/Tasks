<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class JwtAuthServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Servicios de registro.
     *
     * @return void
     */
    public function register()
    {
        require_once app_path() . '/Helpers/JwtAuth.php';
    }
}
