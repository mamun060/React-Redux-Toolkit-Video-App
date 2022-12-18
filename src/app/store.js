import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import videosReducer from '../features/videos/videosSlice';
import tagsReducer from '../features/tags/tagsSlice';
import videoReducer from '../features/video/videoSlice';
import relatedVideoReducer from '../features/relatedVideos/relatedVideosSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    tags: tagsReducer,
    video: videoReducer,
    relatedVidoes: relatedVideoReducer,
    filter: filterReducer
  },
});
