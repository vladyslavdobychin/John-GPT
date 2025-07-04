<?php

use App\Http\Controllers\GetDocumentByIdAction;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('document/{id}', [GetDocumentByIdAction::class, '__invoke']);