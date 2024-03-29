import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/configAxios";

const tracksHome = createSlice({
    name:'tracksHome',
    initialState:{ 
        tracks:[],
        isLoading:false

    },
    reducers:{
      setTracks:(state,action)=>{
          state.tracks = action.payload
      },
      isLoadingOn:(state,action)=>{
        state.isLoading = true
      },
      isLoadingOff:(state,action)=>{
        state.isLoading = false
      }      
    }
})

export const {setTracks,isLoadingOn,isLoadingOff}=tracksHome.actions

export default tracksHome.reducer

export const getMainTracksThunk = ()=> (dispatch)=>{
    dispatch(isLoadingOn())

    axiosMusic.get('/tracks')
    .then(({ data }) => {
       console.log(data);
       dispatch(setTracks(data.tracks.items))
       dispatch(isLoadingOff())
       
     })
     .catch((err) => console.log(err));
} 

export const searchTracksThunk = (objectSearch)=> (dispatch)=>{
    dispatch(isLoadingOn())

    axiosMusic.post('/tracks/search',objectSearch)
    .then(({ data }) => {
       console.log(data);
       dispatch(setTracks(data.tracks.items))
       dispatch(isLoadingOff())
       
     })
     .catch((err) => console.log(err));
} 




