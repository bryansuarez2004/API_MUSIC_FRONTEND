import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import TrackList from '../shared/TrackList';


const BackPack = ({modeBackPack}) => {
   const {backPack} = useSelector((store)=>store.user)






  return (
    <div className={`${modeBackPack ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 md:translate-y-[-120%]  ' } md:z-10 bg-red-600 w-[40vw] transition-all duration-300 aspect-[1/1.5] md:aspect-auto md:w-auto md:right-auto md:bottom-auto  fixed right-6 bottom-20 md:relative rounded-md md:mt-3 md:h-auto md:grow md:block p-2`}>

    <form>
         <label htmlFor="" className='font-rubick'>
              Nombre:
             <input type="text" className='w-full' />
          
           <TrackList tracks={backPack}/>
          

          <button className='bg-green-500 p-1 rounded-md'>
            Crear Playlist
          </button>
         </label>

    </form>


    </div>
  )
}

export default BackPack