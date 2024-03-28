
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Playlists from './pages/Playlists'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import PrincipalStructure from './components/layouts/PrincipalStructure'

function App() {

  return (
    <>
      <Routes>
        <Route element={<PrincipalStructure />}>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
