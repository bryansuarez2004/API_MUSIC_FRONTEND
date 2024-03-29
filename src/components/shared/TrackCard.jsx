import React from 'react'
import { FaPlay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { onModePlay } from '../../store/slices/playTrack.slice';

const TrackCard = ({track}) => {
     const dispatch = useDispatch()

    const handleOpenMusic = ()=>{
        dispatch(onModePlay())

         //aqui falta poner los datos al estado de reproduccion de musica
    }

  return (
    <article className='flex group gap-2 font-sans items-center p-1 hover:bg-white/30 rounded-md h-[60px]' >
        <header>
              <img className='aspect-square group-hover:shadow-sm group-hover:shadow-white w-[50px] rounded-sm' src={track.album.images[2].url} alt="" />
        </header>
        <div className='grow    '>
            <h3 className=' '>{track.name}</h3>
            <div className='flex '>
                {
                    track.artists.slice(0,3).map((artist,index) => (
                         <div key={artist.id}  className=''>
                             {artist.name}
                            {track.artists.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </div>
                         
                    )) 
                }
            </div >
        </div>
        <div>
        <FaPlay onClick={handleOpenMusic} />
        </div>

    </article>
  )
}

export default TrackCard