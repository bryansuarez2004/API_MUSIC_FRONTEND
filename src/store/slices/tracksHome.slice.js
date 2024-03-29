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
      }    
    }
})

export const {setTracks}=tracksHome.actions

export default tracksHome.reducer

export const getMainTracksThunk = ()=> (dispatch)=>{
    axiosMusic.get('/tracks')
    .then(({ data }) => {
       console.log(data);
       dispatch(setTracks(data.tracks.items))
       
     })
     .catch((err) => console.log(err));
} 

export const searchTracksThunk = (objectSearch)=> (dispatch)=>{
    axiosMusic.post('/tracks/search',objectSearch)
    .then(({ data }) => {
       console.log(data);
       dispatch(setTracks(data.tracks.items))
       
     })
     .catch((err) => console.log(err));
} 




