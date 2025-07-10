<?php

namespace App\Providers;

use App\Repositories\DocumentRepository;
use App\Repositories\DocumentRepositoryInterface;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Connection;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DocumentRepositoryInterface::class, DocumentRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
