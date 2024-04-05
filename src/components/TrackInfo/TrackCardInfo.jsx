import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onModePlay, setTrackInPlay } from '../../store/slices/playTrack.slice'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ListenIcon } from '../Ui/Ux/Buttons'
import { axiosMusic } from '../../utils/configAxios'

const TrackCardInfo = ({track,setTrackInfo}) => {
    const dispatch = useDispatch()
    const {isListen , trackInPlay,modePlay}  = useSelector((store)=> store.playTrack)
     const [hover, setHover] = useState(false)
 
     const handleOpenMusic = ()=>{
         dispatch(onModePlay())
          dispatch(setTrackInPlay(track))
          //aqui falta poner los datos al estado de reproduccion de musica
     }


     const handleNewTrackInfo = ()=>{
        axiosMusic
        .get(`tracks/${track.id}`)
      .then(({ data }) => setTrackInfo(data))
      .catch((err) => console.log(err));

     }
 
   return (
     <article onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} className={`${trackInPlay.id === track.id ? 'bg-white/10 ' : ''} flex  gap-2 font-rubick items-center text-white p-3 hover:bg-white/30 rounded-md h-[60px]`} >
         <header  className='relative'>
             {
             hover   && (<div className='aspect-square w-[50px] bg-primary/50 absolute flex justify-center items-center'>
           <FaPlay onClick={handleOpenMusic} className={`${(trackInPlay.id === track.id && modePlay) ? 'hidden' : ' block'} text-xl hover:text-2xl transition-all cursor-pointer  `} />
             </div>)
             
             }
             
               <img className='aspect-square   w-[50px] rounded-sm' src={track.album.images[2].url} alt="" />
         </header>
         <div className='grow    '>
             <Link onClick={handleNewTrackInfo} to={`/track/${track.id}`} className={`${trackInPlay.id === track.id ? 'text-ligter ' : ''}   hover:underline `}>{track.name}</Link>
             <div className='flex text-gray-400'>
                 {
                     track.artists.slice(0,3).map((artist,index) => (
                          <Link to={`/artist/${artist.id}`} key={artist.id}  className=' text-sm hover:underline'>
                              {artist.name}
                             {track.artists.slice(0,3).length - 1  !== index && <span>,  </span> }
                          </Link>
                          
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

export default TrackCardInfo