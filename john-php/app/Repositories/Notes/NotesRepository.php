<?php

namespace App\Repositories\Notes;

use App\Models\Note;

class NotesRepository implements NotesRepositoryInterface
{
    public function getAllNotes()
    {
        return Note::all();
    }

    public function getNoteById($id)
    {
        return Note::find($id);
    }

}
