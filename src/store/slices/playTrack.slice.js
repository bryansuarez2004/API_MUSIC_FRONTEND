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
      removeCurrentTrack : (state,action)=>{
   state.trackInPlay = {}
      }
    }
})

export const {onModePlay,offModePlay,setTrackInPlay,setListenOn,setListenOff,removeCurrentTrack}=playTrack.actions

export default playTrack.reducer