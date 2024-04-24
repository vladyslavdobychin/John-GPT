<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;

class NoteController extends Controller
{
    public function index(): JsonResponse
    {
        $notes = Note::all();
        return response()->json($notes);
    }

    public function show($id): JsonResponse
    {
        $note = Note::find($id);

        if (!$note)
            return response()->json(['message' => 'Note not found'], 404);

        return response()->json($note);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $note = new Note();
        $note->title = $request->input('title');
        $note->content = $request->input('content');
        $note->save();
        return response()->json($note);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string'
        ]);

        if (!$request->has('title') && !$request->has('content'))
            return response()->json(['message' => 'No valid fields provided for update'], 400);

        $note = Note::find($id);

        if ($request->has('title'))
            $note->title = $request->input('title');

        if ($request->has('content'))
            $note->content = $request->input('content');

        $note->save();
        return response()->json($note);
    }

    public function destroy($id): JsonResponse
    {
        $note = Note::find($id);

        if (!$note)
            return response()->json(['message' => 'Note not found'], 404);

        $note->delete();
        return response()->json(['message' => "Note '$note->title' deleted."]);
    }
}
