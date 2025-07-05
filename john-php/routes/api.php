<?php

use App\Http\Controllers\CreateDocumentAction;
use App\Http\Controllers\GetDocumentByIdAction;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('documents/{id}', [GetDocumentByIdAction::class, '__invoke']);
Route::post('documents', [CreateDocumentAction::class, '__invoke']);