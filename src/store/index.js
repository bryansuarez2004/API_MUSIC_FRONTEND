import { configureStore } from "@reduxjs/toolkit";
import playTrackSlice from "./slices/playTrack.slice";
import tracksHomeSlice from "./slices/tracksHome.slice";

export default configureStore({
    reducer:{
       playTrack:playTrackSlice,
       tracksHome:tracksHomeSlice
     
    }
})