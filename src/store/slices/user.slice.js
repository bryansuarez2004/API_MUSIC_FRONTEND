import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/configAxios";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


const verifySessionStorage = (value) => {
     const objectUser = JSON.parse(sessionStorage.getItem('user'))
    if(objectUser) {
        return objectUser[value]
    }else{
        return ''
    }
}




const user = createSlice({
    name:'user',
    initialState:{ 
        name: verifySessionStorage('name'),
        email: verifySessionStorage('email'),
        token: verifySessionStorage('token'),
        favorites: {
            tracks:[],
            isLoading:false
        },
        playlists:{
            data:[],
            isLoading:false
        }
        

    },
    reducers:{
       setLoginUsers : (state,action)=>{
        const newState =  {...state,...action.payload}
        return newState
       },
       logOutSesion : (state,action)=>{
        sessionStorage.removeItem('user')
        state.name = ''
        state.email = ''
        state.token = ''
        state.favorites.tracks = []
       },
       setFavoriteTracks : (state,action)=>{
         state.favorites.tracks = action.payload
       },
       isLoginOn : (state,action) =>{
         state[action.payload].isLoading = true
       },
       isLoginOff : (state,action)=>{
      state[action.payload].isLoading = false
       },
       addFavoriteTrack : (state,action) =>{
         state.favorites.tracks.push(action.payload)
       },
       removeFavoriteTracks : (state,action) =>{
        const idTrackToDelete = action.payload
         const newFavoriteTracks = state.favorites.tracks.filter((track)=>{
              return track.id !== idTrackToDelete
         })
         state.favorites.tracks = newFavoriteTracks
       }
    }
})

export const {setLoginUsers,logOutSesion,isLoginOff,isLoginOn,setFavoriteTracks,addFavoriteTrack,removeFavoriteTracks}=user.actions

export default user.reducer


export const loginUserThunk = (data)=> (dispatch)=>{
  
    const id = toast.loading("Verificando datos...")



   axios.post('https://api-music-backend.onrender.com/users/login',data)
   .then(({data})=>{
      console.log(data);
      toast.update(id, { render: `bienvenido ${data.name}`, type: "success", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true, });
      dispatch(setLoginUsers(data))
      dispatch(getFavoritesTracksThunk())
      sessionStorage.setItem('user', JSON.stringify(data));
   })
   .catch((err)=>{
     console.log(err);
     if(err.response.data.error === 'Invalid credentials'){
        toast.update(id, { render: `Credenciales incorrectas`, type: "error", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true, });

     }else{
        toast.update(id, { render: `ocurrio un error, intente denuevo`, type: "error", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true, });

     }

   })


} 


export const getFavoritesTracksThunk = () => (dispatch)=>{
   dispatch(isLoginOn('favorites'))

    axiosMusic.get('/users/favoriteTracks')
    .then(({data})=>{
         dispatch(setFavoriteTracks(data))
         dispatch(isLoginOff('favorites'))
        console.log(data)})
    .catch((err)=>console.log(err))
}