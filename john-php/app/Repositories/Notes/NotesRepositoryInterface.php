<?php

namespace App\Repositories\Notes;

use App\DTO\NoteDTO;
use Illuminate\Database\Eloquent\Collection;

interface NotesRepositoryInterface {

    public function getAllNotes() : array;

    public function getNoteById($id) : NoteDTO;

    public function createNote($data) : NoteDTO;

    public function updateNote($id, $data): NoteDTO;

    public function deleteNote($id): void;
}
