import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { onModePlay, setTrackInPlay } from '../../store/slices/playTrack.slice';
import { ListenIcon } from '../Ui/Ux/Buttons';

const TrackCard = ({track}) => {
     const dispatch = useDispatch()
   const {isListen , trackInPlay}  = useSelector((store)=> store.playTrack)
    const [hover, setHover] = useState(false)

    const handleOpenMusic = ()=>{
        dispatch(onModePlay())
         dispatch(setTrackInPlay(track))
         //aqui falta poner los datos al estado de reproduccion de musica
    }

  return (
    <article onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} className={` flex  gap-2 font-rubick items-center text-white p-3 hover:bg-white/30 rounded-md h-[60px]`} >
        <header  className='relative'>
            {
            hover && (<div className='aspect-square w-[50px] bg-primary/50 absolute flex justify-center items-center'>
          <FaPlay onClick={handleOpenMusic} className='text-xl hover:text-2xl transition-all cursor-pointer  ' />
            </div>)
            
            }
            
              <img className='aspect-square   w-[50px] rounded-sm' src={track.album.images[2].url} alt="" />
        </header>
        <div className='grow    '>
            <h3 className={`${trackInPlay.id === track.id ? 'text-green-600 ' : ''}  line-clamp-1 `}>{track.name}</h3>
            <div className='flex '>
                {
                    track.artists.slice(0,3).map((artist,index) => (
                         <div key={artist.id}  className=' text-sm'>
                             {artist.name}
                            {track.artists.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </div>
                         
                    )) 
                }
            </div >
        </div>
        <div className='flex items-center gap-3'>
          {
            (isListen && trackInPlay.id === track.id) && <ListenIcon /> 
          }
            
        </div>

    </article>
  )
}

export default TrackCard