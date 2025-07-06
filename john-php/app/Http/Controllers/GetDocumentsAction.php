<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use App\Repositories\DocumentRepositoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class GetDocumentsAction extends Controller
{
    public function __construct(private DocumentRepositoryInterface $repository)
    {
    }

    public function __invoke(): JsonResponse
    {
        $documents = $this->repository->findAll();

        return new JsonResponse(
            DocumentResource::collection($documents)
        );
    }
}