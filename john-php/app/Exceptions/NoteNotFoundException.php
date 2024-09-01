<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class NoteNotFoundException extends Exception
{
    public function __construct(protected $noteId, protected $message = null, protected $code = 404)
    {
        $this->createErrorMessage($this->noteId);
        parent::__construct($this->message, $this->code);
    }

    private function createErrorMessage($noteId): void
    {
        $this->message = "Note with id: $noteId not found";
    }

    public function render($request): JsonResponse
    {
        return response()->json([
            'error' => $this->message
        ], $this->code);
    }
}
