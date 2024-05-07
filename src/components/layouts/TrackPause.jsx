import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onModePlay } from '../../store/slices/playTrack.slice'
import { ListenIcon } from '../Ui/Ux/Buttons'

const TrackPause = () => {
    const {modeBackPack}=useSelector((store)=>store.user)
    const {trackInPlay,isListen}=useSelector((store)=>store.playTrack)
    const dispatch = useDispatch()

  const handleOpenTrackPlay = () =>{
       dispatch(onModePlay())
  }

  return (
    <div onClick={handleOpenTrackPlay} className={`${modeBackPack ? 'md:left-[20%] w-[79%]' : 'left-0 w-full '} flex gap-3 items-center p-2 cursor-pointer mb-[70px] md:mb-0 h-[60px] bg-primary/95 bottom-0  transition-all duration-200 fixed z-20 md:z-50`}>

        <div className=''>
       <img src={trackInPlay.album.images[2].url} alt="" className='aspect-square w-[45px]' />
        </div>
        <div className='flex flex-col'>
              <h2 className='font-rubick text-sm line-clamp-1 text-ligter'>{trackInPlay.name}</h2>
              <div className='font-rubick text-sm line-clamp-1 text-gray-400'>
              {
                    trackInPlay.artists?.slice(0,3).map((artist,index) => (
                         <div key={artist.id}  className=' text-sm'>
                             {artist.name}
                            {trackInPlay.artists?.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </div>
                         
                    )) 
                }
              </div>
              
        </div>
        <div>
              {
            isListen  && <ListenIcon /> 
          }
              </div>
       </div>
  )
}

export default TrackPause