import React from 'react'
import { useSelector } from 'react-redux'
import TrackCard from './TrackCard'

const TrackList = () => {
   const {tracks,isLoading} = useSelector((store)=>store.tracksHome)


  return (
   <>
   

    <div className=' bg-tertiary rounded-md p-3 max-w-[90%]  md:max-w-[550px] mx-auto grid gap-2 '>
    {
        isLoading ? [1,2,3,4,5,6,7,8,9,10].map(()=>{
            return <EsqueletonTrack />
        }) :  tracks.map((track)=>{


            return <TrackCard key={track.id} track={track} />
        })
    }
    
    

    </div>
    
   
   </>
  )
}





export const EsqueletonTrack = () => {
  return (
    <div className=' p-2 rounded-md bg-tertiary '>
            <div className="animate-pulse flex gap-3 ">
             <div className="rounded-full bg-secondary aspect-square w-12"></div>
             <div className="grid w-full pt-1">
                   <div className="h-5 bg-secondary rounded-md  "></div>
                   <div className="h-2 bg-secondary  rounded-md  "></div>
           </div>
           </div>
            </div>
  )
}


export default TrackList