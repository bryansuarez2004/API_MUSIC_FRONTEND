import { configureStore } from "@reduxjs/toolkit";
import playTrackSlice from "./slices/playTrack.slice";

export default configureStore({
    reducer:{
       playTrack:playTrackSlice
    }
})