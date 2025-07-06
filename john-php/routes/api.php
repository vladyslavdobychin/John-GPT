<?php

use App\Http\Controllers\CreateDocumentAction;
use App\Http\Controllers\GetDocumentByIdAction;
use App\Http\Controllers\UpdateDocumentAction;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('documents', [CreateDocumentAction::class, '__invoke']);
Route::get('documents/{id}', [GetDocumentByIdAction::class, '__invoke']);
Route::put('documents/{id}', [UpdateDocumentAction::class, '__invoke']);