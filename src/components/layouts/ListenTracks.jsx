import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { offModePlay } from '../../store/slices/playTrack.slice'

const ListenTracks = () => {
   const {modePlay}=useSelector((store)=>store.playTrack)
    const dispatch = useDispatch()
  
  const handleOffModeMusic = ()=>{
    dispatch(offModePlay())
  }
  
   console.log(modePlay);
  return (
    <div className={`${modePlay ? 'translate-x-0 ' : 'translate-x-[100%]' } p-3 md:pl-0  fixed md:w-[25vw]  top-0 right-0 w-screen h-screen transition-all  duration-500 bg-primary  text-white`}>
      <div className='bg-secondary p-2 rounded-md'>
     <button onClick={handleOffModeMusic}>cerrar escuchar musica</button>

      </div>
    </div>
  )
}

export default ListenTracks