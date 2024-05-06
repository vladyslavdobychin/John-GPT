import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NotesState} from "../../types.ts";
import * as notesAPI from "./notesAPI.ts";

export const fetchNotes = createAsyncThunk('notes/fetchNotes',
    async (_, {rejectWithValue}) => {
        try {
            return await notesAPI.fetchNotes();
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to fetch notes, unknown error');
        }
    }
);

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