<?php

namespace App\Http\Services;

use App\Domain\Documents\DocumentTitle;
use App\Models\Document;
use App\Repositories\DocumentRepositoryInterface;
use Exception;

class CreateDocumentService
{
    public function __construct(private DocumentRepositoryInterface $repository)
    {
    }

    /**
     * @throws Exception
     */
    public function execute(string $title, string $content): Document
    {
        $title = new DocumentTitle($title);

        if ($this->repository->documentTitleExists($title)) {
            throw new Exception('Document title already exists');
        }

        $document = Document::create(
            $title,
            $content
        );

        $this->repository->save($document);

        return $document;
    }
}