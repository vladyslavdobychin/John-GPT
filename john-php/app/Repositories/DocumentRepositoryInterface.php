<?php

namespace App\Repositories;

use App\Models\Document;

interface DocumentRepositoryInterface
{
    public function findById(int $id): ?Document;

}