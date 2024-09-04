import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk('notes/fetchNotes',
    async () => {
    const response = await axios.get('api/home');
    return response.data;
});

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        items: [],
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
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
                state.error = action.error.message ?? 'Unknown error occurred';
            });
    },
});

export default notesSlice.reducer;