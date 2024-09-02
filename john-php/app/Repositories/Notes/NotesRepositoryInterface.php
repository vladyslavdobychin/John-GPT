<?php

namespace App\Repositories\Notes;

use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;

interface NotesRepositoryInterface {

    public function getAllNotes() : Collection;

    public function getNoteById($id) : Note;

    public function createNote($data) : Note;

    public function updateNote($id, $data): Note;

    public function deleteNote($id): void;
}
