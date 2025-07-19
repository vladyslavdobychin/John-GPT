<?php

namespace App\Repositories;

use App\Models\Document;
use \Illuminate\Database\Eloquent\Collection;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

class DocumentRepository implements DocumentRepositoryInterface
{
    public function __construct(private Document $model)
    {
    }

    public function findAll(): Collection
    {
        return $this->model->newModelQuery()->get();
    }

    public function findById(int $id): ?Document
    {
        return $this->model->newModelQuery()->find($id);
    }

    public function createDocument(array $data): Document
    {
        return $this->model->create($data);
    }

    public function updateDocument(int $id, array $data): ?Document
    {
        $document = $this->findById($id);

        if (!$document) {
            return null;
        }

        $document->update($data);

        return $document;
    }

    public function deleteDocument(int $id): void
    {
        $document = $this->findById($id);
        $document->delete();
    }
}
