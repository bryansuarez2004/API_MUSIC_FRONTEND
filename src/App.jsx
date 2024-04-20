
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Playlists from './pages/Playlists'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import PrincipalStructure from './components/layouts/PrincipalStructure'
import Artists from './pages/Artists'
import TrackInfo from './pages/TrackInfo'
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from './components/Auth/PrivateRoutes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesTracksThunk } from './store/slices/user.slice'
import PlaylistInfo from './pages/PlaylistInfo'


function App() {
  const dispatch = useDispatch()
  const {favorites} = useSelector((store)=>store.user)
  

   useEffect(()=>{

    if(favorites.tracks.length === 0 ){
      //hacerla solo si esta logueado

      dispatch(getFavoritesTracksThunk())
    }
   },[])   


  return (
    <>
      <Routes>
        <Route element={<PrincipalStructure />}>
          <Route path="/" element={<Home />} />
          <Route path="/artist/:id" element={<Artists />} />
          <Route path="/track/:id" element={<TrackInfo />} />
          <Route element={<PrivateRoutes/>}>
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<PlaylistInfo />} />
          <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

      </Routes>
        <ToastContainer theme='dark'/>
    </>
  )
}

export default App
