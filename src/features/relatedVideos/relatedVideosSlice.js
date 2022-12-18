import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReletedVideos } from "./relatedVideosAPI";

// our state 
const initialState = {
    relatedVideos: [],
    isLoading: false,
    isError: false,
    error: ""
}

// create thunk 
export const fetchReletedVideos = createAsyncThunk('tags/fetchReletedVideos', async({tags, id})=>{
    const relatedVideos = await getReletedVideos({tags, id});
    return relatedVideos;
})

// create slice 
const relatedVideosSlice = createSlice({
    name: 'relatedVideos',
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(fetchReletedVideos.pending , (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchReletedVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.relatedVideos = action.payload;
        })
        .addCase(fetchReletedVideos.rejected, (state, action)=>{
            state.isLoading = false;
            state.relatedVideos = [];
            state.isError = true;
            state.error = action.payload.message;
        })
    }
})

export default relatedVideosSlice.reducer;