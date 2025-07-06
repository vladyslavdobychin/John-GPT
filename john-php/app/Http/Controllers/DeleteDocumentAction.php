<?php

namespace App\Http\Controllers;

use App\Repositories\DocumentRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class DeleteDocumentAction extends Controller
{
    public function __construct(private DocumentRepositoryInterface $repository)
    {
    }

    public function __invoke(int $id): JsonResponse
    {
        try {
            $this->repository->deleteDocument($id);
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return new JsonResponse(
                ['message' => 'Document not found'],
                Response::HTTP_NOT_FOUND
            );
        }
    }
}
