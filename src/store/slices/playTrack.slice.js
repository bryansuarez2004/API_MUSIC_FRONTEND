import { createSlice } from "@reduxjs/toolkit";

const playTrack = createSlice({
    name:'tracks',
    initialState:{
       modePlay:false,
       isListen:false,
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
    },
      setListenOn :  (state,action)=>{
        state.isListen = true
    },setListenOff : (state,action)=>{
        state.isListen = false
    },
     
    }
})

export const {onModePlay,offModePlay,setTrackInPlay,setListenOn,setListenOff}=playTrack.actions

export default playTrack.reducer