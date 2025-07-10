<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Http\Services\CreateDocumentService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Exception;

class CreateDocumentAction extends Controller
{
    public function __construct(private CreateDocumentService $documentService)
    {
    }

    /**
     * @throws Exception
     */
    public function __invoke(CreateDocumentRequest $request): JsonResponse
    {
        $request->validated();
        $document = $this->documentService->execute(
            $request->get('title'),
            $request->get('content')
        );

        return new JsonResponse(
            new DocumentResource($document),
            Response::HTTP_CREATED
        );
    }
}
