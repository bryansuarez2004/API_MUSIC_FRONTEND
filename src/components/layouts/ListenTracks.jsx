import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { offModePlay } from '../../store/slices/playTrack.slice'
import { Tranquiluxe } from "uvcanvas"
import { Velustro } from "uvcanvas"
import AudioTrack from '../ListenTracks/AudioTrack'


const ListenTracks = () => {
   const {modePlay,trackInPlay}=useSelector((store)=>store.playTrack)
    const dispatch = useDispatch()
  
  const handleOffModeMusic = ()=>{
    dispatch(offModePlay())
  }
  
   console.log(modePlay);
  return (
    <div className={`${modePlay ? 'translate-x-0 ' : 'translate-x-[100%]' } p-3 md:pl-0  fixed md:w-[30vw]  top-0 right-0 w-screen h-screen transition-all  duration-500 bg-primary  text-white overflow-auto`}>
      <div className='bg-secondary p-2 rounded-md  '>

       <h2 className='font-rubick pb-2'>{trackInPlay.name}</h2>
    

      <div className='w-full aspect-square rounded-md overflow-hidden flex justify-center items-center'>
       <img src={trackInPlay.album?.images[1].url} className='absolute w-[70%] rounded-full' alt="" />

      <Velustro />
      </div>

      <h2 className='text-2xl font-bold  pt-3'>{trackInPlay.name}</h2>
      <div className='flex '>
                {
                    trackInPlay.artists?.slice(0,3).map((artist,index) => (
                         <div key={artist.id}  className=' text-sm'>
                             {artist.name}
                            {trackInPlay.artists?.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </div>
                         
                    )) 
                }
      </div >
      </div>
      <div className='bg-secondary p-2 rounded-md mt-3 '>
        <AudioTrack trackInPlay={trackInPlay} />
      <button onClick={handleOffModeMusic}>
        cerrar modo musica
       </button>
      </div>
      

       



    </div>
  )
}

export default ListenTracks