<?php

namespace App\Repositories\Notes;

use App\Exceptions\NoteNotFoundException;
use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use App\DTO\NoteDTO;

class NotesRepository implements NotesRepositoryInterface
{
    public function getAllNotes(): Collection
    {
        return Note::all();
    }

    /**
     * @throws NoteNotFoundException
     */
    public function getNoteById($id): NoteDTO
    {
        $note = Note::find($id);

        if (!$note) {
            Log::error("Note with id: $id not found");
            throw new NoteNotFoundException($id);
        }

        return NoteDTO::mapNote($note);
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
        $note = $this->getNoteById($id);

        $note->update($data);

        return NoteDTO::mapNote($note);
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
