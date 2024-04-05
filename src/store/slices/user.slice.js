import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/configAxios";
import { ToastContainer, toast } from 'react-toastify';

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
       },
       setFavoriteTracks : (state,action)=>{
         state.favorites.tracks = action.payload
       }
    }
})

export const {setLoginUsers,logOutSesion}=user.actions

export default user.reducer


export const loginUserThunk = (data)=> (dispatch)=>{
  
    const id = toast.loading("Verificando datos...")



   axiosMusic.post('/users/login',data)
   .then(({data})=>{
      console.log(data);
      toast.update(id, { render: `bienvenido ${data.name}`, type: "success", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true, });
      dispatch(setLoginUsers(data))
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
    axiosMusic.get('/users/favoriteTracks')
    .then(({data})=>console.log(data))
    .catch((err)=>console.log(err))
}