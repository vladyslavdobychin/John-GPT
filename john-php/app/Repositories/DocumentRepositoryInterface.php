<?php

namespace App\Repositories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Collection;

interface DocumentRepositoryInterface
{
    public function findAll(): Collection;

    public function findById(int $id): ?Document;

    public function createDocument(array $data): Document;

    public function updateDocument(int $id, array $data): Document;

    public function deleteDocument(int $id): void;
}