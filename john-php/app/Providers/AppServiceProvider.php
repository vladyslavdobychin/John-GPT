<?php

namespace App\Providers;

use App\Models\Document;
use App\Repositories\DocumentRepository;
use App\Repositories\DocumentRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DocumentRepositoryInterface::class, DocumentRepository::class);
        $this->app->bind(DocumentRepository::class, function ($app) {
            return new DocumentRepository(new Document());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
