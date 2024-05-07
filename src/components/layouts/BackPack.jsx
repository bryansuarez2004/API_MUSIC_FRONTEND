import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import ListOfTracksBP from '../BackPack/ListOfTracksBP';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { createPlaylistThunk } from '../../store/slices/user.slice';



const BackPack = ({modeBackPack}) => {
   const {backPack} = useSelector((store)=>store.user)
   const {register,handleSubmit,reset} = useForm()
   const dispatch = useDispatch()



   const  submit = handleSubmit((data)=>{
          if( (backPack.length === 0 ) || (data.name === '')) {
            return toast.warn("Para crear una playlist debes poner el nombre y tener minimo 1 cancion ", {
              autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: false,
            });
          }

      const tracks = backPack.map((track)=>track.id)
       data.tracks = tracks

       
         dispatch(createPlaylistThunk(data,tracks.length,reset))

   })


  return (
    <div className={`${modeBackPack ? 'translate-y-0 opacity-100' : 'translate-y-[150%] z-40 opacity-0 md:translate-y-[-120%]  ' } md:z-10 z-[100]  bg-secondary w-[60vw] transition-all duration-300 aspect-[1/1.5] md:aspect-auto md:w-auto md:right-auto md:bottom-auto  fixed right-6 bottom-20 md:relative rounded-md md:mt-3 md:h-auto md:grow md:block p-2 overflow-auto max-w-[240px] md:max-w-none`}>

    <form onSubmit={submit} className='grid grid-rows-[1fr,5fr,1fr] h-full ' > 
         
              
             <input placeholder='Nombre de la playlist' {...register('name')} type="text" className='w-full bg-tertiary text-white font-rubick rounded-lg outline-none p-1' />
          
        
         <div className='overflow-auto customScroll my-1'>
           {
            backPack.length === 0 && <span className='font-rubick text-zinc-400 text-xs mt-3  block'>Agrega canciones para poder crear una playlist</span>
           }
           
           <ListOfTracksBP />
 
         </div>
          

          <button className=' border-2 hover:text-ligter hover:border-ligter hover:tracking-wider transition-all duration-200   p-1 rounded-2xl font-rubick border-gray-300 text-gray-300'>
            Crear Playlist
          </button>

    </form>


    </div>
  )
}

export default BackPack