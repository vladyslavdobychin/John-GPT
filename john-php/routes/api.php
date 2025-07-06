<?php

use App\Http\Controllers\{DeleteDocumentAction, UpdateDocumentAction, GetDocumentByIdAction, CreateDocumentAction};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('documents', [CreateDocumentAction::class, '__invoke']);
Route::get('documents/{id}', [GetDocumentByIdAction::class, '__invoke']);
Route::put('documents/{id}', [UpdateDocumentAction::class, '__invoke']);
Route::delete('documents/{id}', [DeleteDocumentAction::class, '__invoke']);