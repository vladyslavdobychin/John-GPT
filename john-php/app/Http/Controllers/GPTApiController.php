<?php

namespace App\Http\Controllers;

use App\GPT\GPTApiService;
use GuzzleHttp\Client;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GPTApiController extends Controller
{
    private GPTApiService $api;
    public function __construct(GPTApiService $api)
    {
        $this->api = $api;
    }

    public function createChat(Request $request)
    {
        return $this->api->createChat($request->message);
    }
}
