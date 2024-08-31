<?php

namespace App\Repositories\Notes;

interface NotesRepositoryInterface {

    public function getAllNotes();

    public function getNoteById($id);

}
