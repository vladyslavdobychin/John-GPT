import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    return await fetch('/api/notes', {
        headers: {'Accept': 'application/json'}
    }).then(res => res.json());
});

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        selectedNoteId: null,
    },
    reducers: {
        selectNote: (state, action) => {
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
                state.error = action.error.message;
            });
    },
});

export const {selectNote} = notesSlice.actions;
export default notesSlice.reducer;