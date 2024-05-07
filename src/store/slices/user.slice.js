import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/configAxios";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { removeCurrentTrack } from "./playTrack.slice";


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
        },
        backPack: [],
        modeBackPack: false,
        

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
        state.backPack = []
       },
       setFavoriteTracks : (state,action)=>{
         state.favorites.tracks = action.payload
       },
       changeModeBackpack: (state,action)=>{
              state.modeBackPack = !state.modeBackPack
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
       },
       addTrackToBackPack : (state,action)=>{
     state.backPack.push(action.payload)
       },
       removeTrackInBackPack : (state,action)=>{
        const idToDelete = action.payload
        const newBackPack =  state.backPack.filter((track)=>{
                      return track.id !== idToDelete
         })
       state.backPack = newBackPack
       },
       setPlaylists : (state,action)=>{
            state.playlists.data = action.payload
       },
       removePlaylist : (state,action)=>{
        const idPlaylistToDelete = action.payload
          const newPlaylists =   state.playlists.data.filter((playlist)=>{
               return  playlist.id !== idPlaylistToDelete
            })

            state.playlists.data = newPlaylists
       },
       addPlaylist : (state,action)=>{
        state.playlists.data.push(action.payload)
       },
       resetBackPack : (state,action)=>{
       state.backPack = []
       },
       sharePlaylist : (state,action) => {
          const idP = action.payload
          const newPlaylists = state.playlists.data.map((playlist)=>{
              if(playlist.id === idP){
                return {...playlist,shared:true}
              } else{
                return playlist
              }

            })
            state.playlists.data = newPlaylists
       }
    }
})

export const {setLoginUsers,changeModeBackpack,sharePlaylist,removeTrackInBackPack,resetBackPack,addPlaylist,removePlaylist,setPlaylists,addTrackToBackPack,logOutSesion,isLoginOff,isLoginOn,setFavoriteTracks,addFavoriteTrack,removeFavoriteTracks}=user.actions

export default user.reducer


export const loginUserThunk = (data,navigate)=> (dispatch)=>{
  
    const id = toast.loading("Verificando datos...")



   axios.post('https://api-music-backend.onrender.com/users/login',data)
   .then(({data})=>{
      console.log(data);
      toast.update(id, { render: `bienvenido ${data.name}`, type: "success", isLoading: false, autoClose:2300,pauseOnHover: false,closeOnClick: true, });
      dispatch(setLoginUsers(data))
      dispatch(getFavoritesTracksThunk(navigate,true))
      
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


export const getFavoritesTracksThunk = (navigate,reload) => (dispatch)=>{
   dispatch(isLoginOn('favorites'))

    axiosMusic.get('/users/favoriteTracks')
    .then(({data})=>{
         dispatch(setFavoriteTracks(data))
         dispatch(isLoginOff('favorites'))
         navigate('/')
         if(reload) dispatch(removeCurrentTrack())
        console.log(data)})
    .catch((err)=>console.log(err))
}

export const getPlaylistsThunk = () => (dispatch) =>{
  dispatch(isLoginOn('playlists'))
    axiosMusic.get('/playlists')
    .then(({data})=>{
      dispatch(setPlaylists(data))
      dispatch(isLoginOff('playlists'))
      console.log(data)})
    .catch((err)=>console.log(err))
}


export const createPlaylistThunk = (object,numberOfTracks,reset)=>(dispatch) =>{

  const id = toast.loading("Creando Playlist...")

  
   axiosMusic.post('/playlists/create',object)
   .then(({data})=>{
    toast.update(id, { render: `Playlist creada correctamente`, type: "success", isLoading: false, autoClose:1500,pauseOnHover: false,closeOnClick: true, });
      
    dispatch(addPlaylist({...data,tracks:new Array(numberOfTracks)}))
    reset()
    dispatch(resetBackPack())
    console.log(data)})
   .catch((err)=>console.log(err))

}

export const deletePlaylistThunk = (id,navigate) => (dispatch) =>{

  const ide = toast.loading("Eliminando Playlist...")
     

    axiosMusic.delete(`/playlists/${id}/remove`)
    .then(({data})=>{
      toast.update(ide, { render: `Playlist eliminada correctamente`, type: "success", isLoading: false, autoClose:1500,pauseOnHover: false,closeOnClick: true, });
       dispatch(removePlaylist(id))
       navigate('/playlists')
      console.log(data)
       
    })
     .catch((err)=>console.log(err))
}