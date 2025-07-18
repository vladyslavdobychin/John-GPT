<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Repositories\DocumentRepositoryInterface;
use Illuminate\Http\JsonResponse;

class UpdateDocumentAction extends Controller
{
    public function __construct(private DocumentRepositoryInterface $repository)
    {
    }

    public function __invoke(int $id, UpdateDocumentRequest $request): JsonResponse
    {
        $data = $request->validated();
        $document = $this->repository->updateDocument($id, $data);

        if (!$document) {
            return new JsonResponse("Document with id {$id} not found", 404);
        }

        return new JsonResponse(new DocumentResource($document));
    }
}
