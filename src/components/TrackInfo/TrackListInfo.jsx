import React, { useEffect, useState } from 'react'
import { axiosMusic } from '../../utils/configAxios'
import { EsqueletonTrack } from '../shared/TrackList'
import TrackCardInfo from './TrackCardInfo'

const TrackListInfo = ({nameTrack,setTrackInfo,setIsLoading,isLoading}) => {
   const [Tracks, setTracks] = useState([])
   

   console.log(nameTrack.artists[0].name);

  useEffect(()=>{
    if(nameTrack){
        setIsLoading(true)

    axiosMusic.post('/tracks/search',{name:`${nameTrack.artists[0].name}`,limit:"15"})
    .then(({ data }) => {
       setTracks(data.tracks.items)
       setIsLoading(false)
     })
     .catch((err) => console.log(err));
    }
     
  },[])


  return (
    <>
    
    <div className='  rounded-md p-3 max-w-[90%]  md:max-w-[700px] mx-auto grid gap-2 '>
      
    {
      isLoading ? [1,2,3,4,5,6,7,8,9,10].map((num)=>{
        return <EsqueletonTrack key={num} />
      }) :  Tracks.map((track)=>{
        
        
        return <TrackCardInfo key={track.id} track={track} setTrackInfo={setTrackInfo} />
      })
    }
    
    

    </div>
    </>
  )
}

export default TrackListInfo