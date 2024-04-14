import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import { ButtonTrash } from '../Ui/Ux/Buttons';


const ListOfTracksBP = () => {
    const {backPack} = useSelector((store)=>store.user)
   

    const handleDelete = ()=>{
        console.log('eliminando');
    }

  return (
    <div className='grid p-1 gap-1'>
        {
            backPack.map((track)=>{
                return  <div key={track.id} className='flex gap-1 p-1 rounded-md text-xs  items-center bg-tertiary '>
                  <img src={track.album?.images[2].url} alt=""  className='aspect-square w-[30px] md:w-[45px]'/>
                  <div className='grow'>
                  <div className='line-clamp-1 text-white font-rubick '>
                    {track.name}
                  </div>
                  <div className='text-zinc-400 line-clamp-1'>
                  {
                    track.artists.slice(0,3).map((artist,index) => (
                         <div  key={artist.id}  className=''>
                             {artist.name}
                            {track.artists.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </div>
                         
                    )) 
                }
                  </div>

                  </div>
                  <div>

                  <ButtonTrash functionToDelete={handleDelete} />
                  </div>
                  
                  
                </div>
            })
        }
    </div>
  )
}

export default ListOfTracksBP