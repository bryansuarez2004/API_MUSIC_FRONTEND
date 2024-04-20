import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Account from '../components/layouts/Account'
import HeaderPlaylist from '../components/PlaylistsPage/HeaderPlaylist'
import { getPlaylistsThunk } from '../store/slices/user.slice'
import PlaylistsList from '../components/PlaylistsPage/PlaylistsList'



const Playlists = () => {
  const dispatch = useDispatch()
     const {playlists} = useSelector((store)=>store.user)

     useEffect(()=>{
      dispatch(getPlaylistsThunk())
     },[])
  

  return (
    <>
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
       <HeaderPlaylist />


       <PlaylistsList playlists={playlists.data} />

    </div>
    </div>

    {
      !playlists.isLoading  && <Account />
    }
    </>
  )
}

export default Playlists