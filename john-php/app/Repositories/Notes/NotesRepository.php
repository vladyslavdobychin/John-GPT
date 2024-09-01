<?php

namespace App\Repositories\Notes;

use App\Exceptions\NoteNotFoundException;
use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class NotesRepository implements NotesRepositoryInterface
{
    public function getAllNotes(): Collection
    {
        return Note::all();
    }

    /**
     * @throws NoteNotFoundException
     */
    public function getNoteById($id): Note
    {
        $note = Note::find($id);

        if (!$note) {
            Log::error("Note with id: $id not found");
            throw new NoteNotFoundException($id);
        }

        return $note;
    }

    public function createNote($data): Note
    {
        return Note::create($data);
    }

    /**
     * @throws NoteNotFoundException
     */
    public function updateNote($id, $data): Note
    {
        $note = $this->getNoteById($id);

        $note->update($data);

        return $note;
    }

    /**
     * @throws NoteNotFoundException
     */
    public function deleteNote($id): void
    {
       $note = $this->getNoteById($id);

       $note->delete();
    }

}
