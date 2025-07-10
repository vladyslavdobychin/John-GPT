<?php

namespace App\Repositories;

use App\Domain\Documents\DocumentTitle;
use App\Models\Document;
use Illuminate\Database\Connection;
use Illuminate\Database\Eloquent\Collection;

class DocumentRepository implements DocumentRepositoryInterface
{
    public function __construct(private Connection $db)
    {
    }

    public function findAll(): Collection
    {
        return Document::all();
    }

    public function findById(int $id): ?Document
    {
        return Document::find($id);
    }

    public function updateDocument(int $id, array $data): Document
    {
        $document = Document::findOrFail($id);
        $document->update($data);

        return $document;
    }

    public function deleteDocument(int $id): void
    {
        $document = Document::findOrFail($id);
        $document->delete();
    }

    public function documentTitleExists(DocumentTitle $title): bool
    {
        return $this->db->table('documents')
            ->where('title', $title->getValue())
            ->exists();
    }

    public function save(Document $document): Document
    {
        $document->save();
        return $document;
    }
}
