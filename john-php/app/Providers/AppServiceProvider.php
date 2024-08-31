<?php

namespace App\Providers;

use App\Repositories\Notes\NotesRepository;
use App\Repositories\Notes\NotesRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(NotesRepositoryInterface::class, NotesRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
