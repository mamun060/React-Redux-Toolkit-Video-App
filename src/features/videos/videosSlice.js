import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosAPI";


// initialstate setup 
const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    error: ""
}

// create thunk setup
export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    const videos = await getVideos();
    return videos;
})

// create slice setup 

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchVideos.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchVideos.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.videos = action.payload;
        })
        .addCase(fetchVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.videos = [];
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})


// export slice
// export const {} = videosSlice.actions; 
export default videosSlice.reducer;