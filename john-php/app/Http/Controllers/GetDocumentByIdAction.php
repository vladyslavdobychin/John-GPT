<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use App\Repositories\DocumentRepositoryInterface;
use Illuminate\Http\JsonResponse;

class GetDocumentByIdAction extends Controller
{
    public function __construct(private DocumentRepositoryInterface $repository)
    {
    }

    public function __invoke(int $id): JsonResponse
    {
        $document = $this->repository->findById($id);

        if (!$document) {
            return new JsonResponse("Document with id {$id} not found", 404);
        }

        return new JsonResponse(new DocumentResource($document));
    }
}
