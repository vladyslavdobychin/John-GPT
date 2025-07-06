<?php

use App\Http\Controllers\{
    CreateDocumentAction,
    DeleteDocumentAction,
    UpdateDocumentAction,
    GetDocumentByIdAction,
    GetDocumentsAction
};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('documents', [CreateDocumentAction::class, '__invoke']);
Route::get('documents', [GetDocumentsAction::class, '__invoke']);
Route::get('documents/{id}', [GetDocumentByIdAction::class, '__invoke']);
Route::put('documents/{id}', [UpdateDocumentAction::class, '__invoke']);
Route::delete('documents/{id}', [DeleteDocumentAction::class, '__invoke']);