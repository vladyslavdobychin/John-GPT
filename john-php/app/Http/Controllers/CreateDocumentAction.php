<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDocumentRequest;
use App\Repositories\DocumentRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CreateDocumentAction extends Controller
{
    public function __construct(private DocumentRepositoryInterface $repository)
    {
    }

    public function __invoke(CreateDocumentRequest $request): JsonResponse
    {
        $data = $request->validated();
        $document = $this->repository->createDocument($data);

        return new JsonResponse($document, Response::HTTP_CREATED);
    }
}