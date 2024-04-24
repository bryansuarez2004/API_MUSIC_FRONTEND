import React, { useEffect, useState } from 'react'
import HeaderPlaylistInfo from '../components/PlaylistInfoPage/HeaderPlaylistInfo'
import { useParams } from 'react-router-dom'
import { axiosMusic } from '../utils/configAxios'
import TrackList from '../components/shared/TrackList'

const PlaylistInfo = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [currentPlaylist, setCurrentPlaylist] = useState({})
   const {id} = useParams()


   useEffect(()=>{
   setIsLoading(true)
   
     axiosMusic.get(`/playlists/${id}/tracks`)
     .then(({data})=>{
        setIsLoading(false)
        setCurrentPlaylist(data)
        console.log(data)})
     .catch((err)=>console.log(err))
   },[])
    



  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
     <HeaderPlaylistInfo playlist={currentPlaylist}  setCurrentPlaylist={setCurrentPlaylist} isLoading={isLoading}/>
     <div  style={{
            background: `${!isLoading ? 'linear-gradient(180deg, rgba(52, 211, 153,0.5) 0%, rgba(253,45,45,0) 70%)' : ''} `,
          }}>



     {
       !isLoading &&  <h2 className='font-rubick text-2xl text-white tracking-wider p-5 font-bold'> Tus Canciones:</h2>
     } 

     <TrackList tracks={currentPlaylist.tracks} isLoading={isLoading} />

     </div>
     

          
    </div>
    </div>
  )
}

export default PlaylistInfo