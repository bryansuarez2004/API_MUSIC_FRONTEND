import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { onModePlay, setTrackInPlay } from '../../store/slices/playTrack.slice';
import { ButtonAddToBackPack, ButtonLike, ListenIcon } from '../Ui/Ux/Buttons';
import { Link, useNavigate } from 'react-router-dom';

const TrackCard = ({track,functionOfArtist,functionOfTracks,btnLike,btnBackPack}) => {
     const dispatch = useDispatch()
   const {isListen , trackInPlay,modePlay}  = useSelector((store)=> store.playTrack)
   const [hover, setHover] = useState(false)
   const navigate = useNavigate()
   const {favorites} = useSelector((store)=>store.user)
   const [isLiked, setIsLiked] = useState(false)


    const handleOpenMusic = ()=>{
        dispatch(onModePlay())
         dispatch(setTrackInPlay(track))
         //aqui falta poner los datos al estado de reproduccion de musica
    }
   

    useEffect(()=>{
      console.log('analizando');
    if(btnLike){
       const isFavorite =  favorites.tracks.some((trackFavorite)=>{
       
               return trackFavorite.id === track.id
       });
       
        if(isFavorite){
          setIsLiked(true)
        }
    } 

    },[])



    const handleClickArtist = (id) =>{
      navigate(`/artist/${id}`)

      if(functionOfArtist){

        functionOfArtist(id)
      }
    }

    const handleClickTrack = (idTrack) => {
      console.log(idTrack);
       navigate(`/track/${idTrack}`)

       if(functionOfTracks){

        functionOfTracks(idTrack)
      }
    }


  return (
    <article onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} className={`${trackInPlay.id === track.id ? 'bg-white/10 ' : ''} flex  gap-2 font-rubick items-center text-white p-3 hover:bg-white/30 rounded-md h-[60px]`} >
        <header  className='relative'>
            {
            hover   && (<div className='aspect-square w-[50px] bg-primary/50 absolute flex justify-center items-center'>
          <FaPlay onClick={handleOpenMusic} className={`${(trackInPlay.id === track.id && modePlay) ? 'hidden' : ' block'} text-xl hover:text-2xl transition-all cursor-pointer  `} />
            </div>)
            
            }
            
              <img className='aspect-square   w-[50px] rounded-sm' src={track.album?.images[2].url} alt="" />
        </header>
        <div className='grow    '>
          <div className='line-clamp-1'>

            <div onClick={()=>handleClickTrack(track.id)} className={`${trackInPlay.id === track.id ? 'text-ligter ' : ''} cursor-pointer   hover:underline  `}>{track.name}</div>
          </div>
            <div className=' text-gray-400 line-clamp-1'>
                {
                    track.artists?.slice(0,3).map((artist,index) => (
                         <button onClick={()=>handleClickArtist(artist.id)} key={artist.id}  className=' text-sm hover:underline'>
                             {artist.name}
                            {track.artists.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </button>
                         
                    )) 
                }
            </div >
        </div>
        <div className='flex items-center gap-3'>
          {
            (isListen && trackInPlay.id === track.id) && <ListenIcon /> 
          }
          {
            btnLike && <ButtonLike isLiked={isLiked} setIsLiked={setIsLiked} track={track} />
          }  
          {
            btnBackPack && <ButtonAddToBackPack track={track} />
          }
        </div>

    </article>
  )
}

export default TrackCard