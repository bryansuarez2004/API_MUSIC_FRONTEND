import React, { useEffect, useState } from 'react'
import { axiosMusic } from '../utils/configAxios'
import { useParams } from 'react-router-dom'
import HeaderPlaylistShared from '../components/SharedPlaylistPage/HeaderPlaylistShared'
import TrackList from '../components/shared/TrackList'
import Account from '../components/layouts/Account'
import { BiConfused } from "react-icons/bi";

const SharedPlaylist = () => {
    const [currentPlaylist, setCurrentPlaylist] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    
     const {id} = useParams()



   useEffect(()=>{
    setIsLoading(true)

    axiosMusic.get(`/playlists/${id}/shared`)
    .then(({data})=>{
        setIsLoading(false)
        if(data.error){
          setErrors(true)
        }else{

            setCurrentPlaylist(data)
        }
        console.log(data)})
    .catch((err)=>{
        setIsLoading(false)
        setErrors(true)
        console.log(err)})
   },[])


   if(errors){
    return (
        <div className="bg-primary md:p-3  md:pl-0  h-screen ">
          <div className="bg-secondary rounded-md h-[100%] overflow-auto flex flex-col justify-center items-center">
            
          <BiConfused className='text-[150px] text-green-400' />
           <span className='font-rubick text-3xl text-green-400 font-bold text-center'> PLAYLIST NO DISPONIBLE</span>

         {
          
          !isLoading  &&  <Account />
        }
    
          </div>
        </div>
    )
   }else{
    return (
        <div className="bg-primary md:p-3  md:pl-0  h-screen ">
          <div className="bg-secondary rounded-md h-[100%] overflow-auto">
            <HeaderPlaylistShared playlist={currentPlaylist} isLoading={isLoading} />
            <div  style={{
                background: `${!isLoading ? 'linear-gradient(180deg, rgba(163, 230, 53,0.5) 0%, rgba(253,45,45,0) 70%)' : ''} `,
              }} >
    
         {
           !isLoading &&  <h2 className='font-rubick text-2xl text-white tracking-wider p-5 font-bold'> Canciones:</h2>
         } 
    
         <TrackList tracks={currentPlaylist.tracks} isLoading={isLoading} />
    
         </div>
    
    
         {
          
          !isLoading  &&  <Account />
        }
    
          </div>
        </div>
    
      )
   }

  
}

export default SharedPlaylist