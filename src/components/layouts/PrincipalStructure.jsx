import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside'
import Account from './Account'
import { useDispatch, useSelector } from 'react-redux'
import { onModePlay } from '../../store/slices/playTrack.slice'
import ListenTracks from './ListenTracks'

const PrincipalStructure = () => {

    const {modePlay}=useSelector((store)=>store.playTrack)
   



  return (
    <>
    <div className='bg-primary'>
    <div className={`${modePlay?'md:w-[70vw]':'w-full'} grid  h-screen   md:grid-cols-[1fr,4fr] transition-all duration-500 relative`}>
        <Aside />
    
    <Outlet />

    <Account />
    </div>
    <ListenTracks />

    </div>
    
    </>
    
  )
}

export default PrincipalStructure