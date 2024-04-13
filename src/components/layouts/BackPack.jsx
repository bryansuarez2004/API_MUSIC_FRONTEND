import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import TrackList from '../shared/TrackList';


const BackPack = ({modeBackPack}) => {
   const {backPack} = useSelector((store)=>store.user)






  return (
    <div className={`${modeBackPack ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 md:translate-y-[-120%]  ' } md:z-10 bg-secondary w-[60vw] transition-all duration-300 aspect-[1/1.5] md:aspect-auto md:w-auto md:right-auto md:bottom-auto  fixed right-6 bottom-20 md:relative rounded-md md:mt-3 md:h-auto md:grow md:block p-2 overflow-auto max-w-[240px] md:max-w-none`}>

    <form className='grid grid-rows-[1fr,5fr,1fr] h-full ' > 
         
              
             <input placeholder='Nombre de la playlist' type="text" className='w-full bg-tertiary text-zinc-400 font-rubick rounded-lg outline-none p-1' />
          
        
         <div className='overflow-auto'>
           {
            backPack.length === 0 && <span className='font-rubick text-zinc-400 text-xs mt-3  block'>Agrega canciones para poder crear una playlist</span>
           }
           <TrackList tracks={backPack}/>
         </div>
          

          <button className='bg-green-500 p-1 rounded-md'>
            Crear Playlist
          </button>

    </form>


    </div>
  )
}

export default BackPack