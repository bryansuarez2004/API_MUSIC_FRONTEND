import React, { useEffect, useState } from 'react'
import { axiosMusic } from '../../utils/configAxios'
import { EsqueletonTrack } from '../shared/TrackList'
import TrackCard from '../shared/TrackCard'

const TrackListInfo = ({nameTrack}) => {
   const [isLoading, setIsLoading] = useState(false)
   const [Tracks, setTracks] = useState([])

   console.log(nameTrack);

  useEffect(()=>{
    if(nameTrack){
        console.log(nameTrack);
        setIsLoading(true)

    axiosMusic.post('/tracks/search',{name:`${nameTrack}`,limit:"15"})
    .then(({ data }) => {
       setTracks(data.tracks.items)
       setIsLoading(false)
     })
     .catch((err) => console.log(err));
    }
     
  },[])


  return (
    <div className='  rounded-md p-3 max-w-[90%]  md:max-w-[550px] mx-auto grid gap-2 '>
    {
        isLoading ? [1,2,3,4,5,6,7,8,9,10].map((num)=>{
            return <EsqueletonTrack key={num} />
        }) :  Tracks.map((track)=>{


            return <TrackCard key={track.id} track={track} />
        })
    }
    
    

    </div>
  )
}

export default TrackListInfo