<?php

namespace App\Repositories\Notes;

use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;

class NotesRepository implements NotesRepositoryInterface
{
    public function getAllNotes(): Collection
    {
        return Note::all();
    }

    public function getNoteById($id): Note
    {
        return Note::find($id);
    }

    public function createNote($data): Note
    {
        return Note::create($data);
    }

}
