import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Account from '../components/layouts/Account'
import HeaderPlaylist from '../components/PlaylistsPage/HeaderPlaylist'
import { getPlaylistsThunk } from '../store/slices/user.slice'
import PlaylistsList from '../components/PlaylistsPage/PlaylistsList'
import Footer from '../components/layouts/Footer'



const Playlists = () => {
  const dispatch = useDispatch()
     const {playlists} = useSelector((store)=>store.user)

     useEffect(()=>{

      if(playlists.data.length === 0){

        dispatch(getPlaylistsThunk())
      }
     },[])
  

  return (
    <>
    <div  className='bg-secondary md:p-3  md:pl-0  h-screen  pb-[40px] md:pb-[30px]'>

    <div style={{
            background: `${!playlists.isLoading ? 'linear-gradient(180deg, rgba(22, 163, 74, 0.7) 0%, rgba(253,45,45,0) 80%)' : '' } `,
          }} className='bg-secondary rounded-md h-[100%] overflow-auto customScroll '>
       <HeaderPlaylist isLoading={playlists.isLoading} />

       {
        (!playlists.isLoading && playlists.data.length === 0) && <div className='font-rubick text-gray-300 font-medium p-5 '>Agrega canciones a la mochila, colocales un nombre y crea una playlist!!</div>
       }
       <div className='flex flex-col justify-between min-h-[350px] mb-[60px] md:mb-0'>

       <PlaylistsList playlists={playlists.data} isLoading={playlists.isLoading} />
        <Footer minus />
       </div>

    </div>
    </div>

    {
      !playlists.isLoading  && <Account />
    }

    </>
  )
}

export default Playlists