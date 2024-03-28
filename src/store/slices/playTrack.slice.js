import { createSlice } from "@reduxjs/toolkit";

const playTrack = createSlice({
    name:'tracks',
    initialState:{
       modePlay:false,
      
    },
    reducers:{
       onModePlay : (state,action)=>{
           state.modePlay = true
       },
       offModePlay : (state,action)=>{
        state.modePlay = false
    },
     
    }
})

export const {onModePlay,offModePlay}=playTrack.actions

export default playTrack.reducer