<?php

namespace App\Repositories;

use App\Models\Document;

interface DocumentRepositoryInterface
{
    public function findById(int $id): ?Document;

    public function createDocument(array $data): Document;

    public function updateDocument(int $id, array $data): Document;
}