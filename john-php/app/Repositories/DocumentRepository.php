<?php

namespace App\Repositories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Builder;

class DocumentRepository implements DocumentRepositoryInterface
{
    public function __construct(private Document $model)
    {
    }

    public function findById(int $id): ?Document
    {
        return $this->model->newModelQuery()->find($id);
    }

    public function createDocument(array $data): Document
    {
        $document = new Document($data);
        $document->save();

        return $document;
    }
}