import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTags } from "./tagsAPI";


// our state 
const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: ""
}

// create thunk 
export const fetchTags = createAsyncThunk('tags/fetchTags', async()=>{
    const tags = await getTags();
    
    return tags;
})

// create slice 
const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTags.pending , (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchTags.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.tags = action.payload;
        })
        .addCase(fetchTags.rejected, (state, action)=>{
            state.isLoading = false;
            state.tags = [];
            state.isError = true;
            state.error = action.payload.message;
        })
    }
})


export default tagsSlice.reducer;