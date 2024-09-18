<?php

 namespace App\DTO;
use App\Models\Note;
use Illuminate\Support\Collection;

class NoteDTO
{
    public function __construct(
        public? int $id,
        public? string $title,
        public? string $content,
        public? string $created_at,
        public? string $updated_at
    ) {}

    public static function mapNote(Note $note): NoteDTO
    {
        return new self(
            id: $note->id,
            title: $note->title,
            content: $note->content,
            created_at: $note->created_at ? $note->created_at->format('M d, Y H:i:s') : null,
            updated_at: $note->updated_at ? $note->created_at->format('M d, Y H:i:s') : null,
        );
    }

    public static function mapCollection(Collection $notes): array
    {
        return $notes->map(fn($note) => self::mapNote($note))->toArray();
    }
}
