<?php

namespace App\Repositories;

use App\Domain\Documents\DocumentTitle;
use App\Models\Document;
use Illuminate\Database\Eloquent\Collection;

interface DocumentRepositoryInterface
{
    public function findAll(): Collection;

    public function findById(int $id): ?Document;

    public function updateDocument(int $id, array $data): Document;

    public function deleteDocument(int $id): void;

    public function documentTitleExists(DocumentTitle $title): bool;

    public function save(Document $document): Document;
}