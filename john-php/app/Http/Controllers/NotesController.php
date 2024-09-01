<?php

namespace App\Http\Controllers;

use App\Repositories\Notes\NotesRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotesController extends Controller
{
    public function __construct(public NotesRepositoryInterface $notesRepository) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $notes = $this->notesRepository->getAllNotes();
        return response()->json($notes);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $note = $this->notesRepository->getNoteById($id);
        return response()->json($note);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:225|unique:notes,title',
            'content' => 'nullable|string'
        ]);

        $note = $this->notesRepository->createNote($data);

        return response()->json($note, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:225|unique:notes,title,' . $id,
            'content' => 'nullable|string'
        ]);

        $updatedNote = $this->notesRepository->updateNote($id, $data);

        return response()->json($updatedNote);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
