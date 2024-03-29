import React from 'react'
import { useSelector } from 'react-redux'
import TrackCard from './TrackCard'

const TrackList = () => {
   const {tracks} = useSelector((store)=>store.tracksHome)


  return (
   <>
    <div className='bg-slate-400 p-4  md:max-w-[550px] mx-auto grid gap-3 '>
    {
        tracks.map((track)=>{
            return <TrackCard key={track.id} track={track} />
        })
    }

    </div>
    
   
   </>
  )
}

export default TrackList