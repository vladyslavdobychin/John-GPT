<?php

namespace App\Repositories\Notes;

use App\Exceptions\NoteNotFoundException;
use App\Models\Note;
use Illuminate\Support\Facades\Log;
use App\DTO\NoteDTO;

class NotesRepository implements NotesRepositoryInterface
{
    public function getAllNotes(): array
    {
        $notes = Note::all();
        return NoteDTO::mapCollection($notes);
    }

    /**
     * @throws NoteNotFoundException
     */
    public function getNoteById($id): NoteDTO
    {
        $note = $this->getNoteModel($id);

        return NoteDTO::mapNote($note);
    }

    /**
     * @throws NoteNotFoundException
     */
    private function getNoteModel($id): Note
    {
        $note = Note::find($id);

        if (!$note) {
            Log::error("Note with id: $id not found");
            throw new NoteNotFoundException($id);
        }

        return $note;
    }

    public function createNote($data): NoteDTO
    {
        $note = Note::create($data);
        return NoteDTO::mapNote($note);
    }

    /**
     * @throws NoteNotFoundException
     */
    public function updateNote($id, $data): NoteDTO
    {
        $note = $this->getNoteModel($id);

        $note->update($data);

        return NoteDTO::mapNote($note);
    }

    /**
     * @throws NoteNotFoundException
     */
    public function deleteNote($id): void
    {
       $note = $this->getNoteModel($id);

       $note->delete();
    }

}
