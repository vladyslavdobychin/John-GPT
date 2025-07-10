<?php

namespace App\Domain\Documents;

use InvalidArgumentException;

final class DocumentTitle
{
    private const DOCUMENT_TITLE_LENGTH = 255;

    private string $title;
    public function __construct(string $title)
    {
        $value = trim($title);

        if (empty($value)) {
            throw new InvalidArgumentException('Document Title cannot be empty');
        }

        if (strlen($value) > self::DOCUMENT_TITLE_LENGTH) {
            throw new InvalidArgumentException('Document Title cannot be longer than 255 characters');
        }

        $this->title = $value;
    }

    public function getValue(): string
    {
        return $this->title;
    }
}