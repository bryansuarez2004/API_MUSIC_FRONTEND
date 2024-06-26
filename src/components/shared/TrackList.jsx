import React from 'react'
import { useSelector } from 'react-redux'
import TrackCard from './TrackCard'

const TrackList = ({tracks,isLoading,functionOfArtist,functionOfTracks,btnLike=false,btnBackPack=false}) => {


  return (
   <>
   
   
    <div className=' p-3   rounded-md  w-full  md:max-w-[700px] mx-auto grid gap-2 '>
    {
        isLoading ? [1,2,3,4,5,6,7,8,9,10].map((num)=>{
            return <EsqueletonTrack key={num} />
        }) :  tracks?.map((track)=>{


            return <TrackCard key={track.id} functionOfTracks={functionOfTracks} functionOfArtist={functionOfArtist} track={track} btnLike={btnLike} btnBackPack={btnBackPack} />
        })
    }
    
    

    </div>
    
   
   </>
  )
}





export const EsqueletonTrack = () => {
  return (
    <div className=' p-2 rounded-md bg-tertiary/30 '>
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