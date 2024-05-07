import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside'
import { useDispatch, useSelector } from 'react-redux'
import { onModePlay } from '../../store/slices/playTrack.slice'
import ListenTracks from './ListenTracks'
import TrackPause from './TrackPause'

const PrincipalStructure = () => {

    const {modePlay,trackInPlay}=useSelector((store)=>store.playTrack)
    const {modeBackPack}=useSelector((store)=>store.user)
   



  return (
    <>
    <div className='bg-primary'>
    <div className={`${modePlay?'md:w-[70vw]':'w-full'} grid  h-screen   md:grid-cols-[1fr,4fr] transition-all duration-500 relative`}>
        <Aside />
    
    <Outlet />
    {
       (!modePlay && trackInPlay.name) && <TrackPause />
    }
    </div>
    <ListenTracks />

    </div>
    
    </>
    
  )
}

export default PrincipalStructure