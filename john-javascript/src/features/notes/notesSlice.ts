import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NotesState} from "../../types.ts";


export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const response = await fetch('/api/notes', {
        headers: {'Accept': 'application/json'}
    });
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return response.json();
});

const initialState: NotesState = {
    items: [],
    status: 'idle',
    error: null,
    selectedNoteId: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        selectNote: (state, action: PayloadAction<number>) => {
            state.selectedNoteId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch notes, unknown error';
            });
    },
});

export const {selectNote} = notesSlice.actions;
export default notesSlice.reducer;