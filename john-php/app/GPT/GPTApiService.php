<?php

namespace App\GPT;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GPTApiService
{
    private String $model;

    public function __construct()
    {
        $this->model = env('GPT_API_MODEL');
    }

    private function request(): PendingRequest {
        return Http::baseUrl(env('GPT_API_URL'))->withToken(env('GPT_API_TOKEN'));
    }

    public function createChat(String $message)
    {
        $req = $this->request()
            ->post('chat/completions', [
                'messages' => [[
                    'role' => 'user',
                    'content' => $message
                ]],
                'model' => $this->model
            ]);
        return $req->json();
    }
}
