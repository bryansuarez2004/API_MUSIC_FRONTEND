import { createSlice } from "@reduxjs/toolkit";

const playTrack = createSlice({
    name:'tracks',
    initialState:{
       modePlay:false,
       trackInPlay:{},

      
    },
    reducers:{
       onModePlay : (state,action)=>{
           state.modePlay = true
       },
       offModePlay : (state,action)=>{
        state.modePlay = false
    },
    setTrackInPlay: (state,action)=>{
       state.trackInPlay = action.payload 
    }
     
    }
})

export const {onModePlay,offModePlay,setTrackInPlay}=playTrack.actions

export default playTrack.reducer