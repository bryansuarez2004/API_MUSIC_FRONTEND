import React from 'react'
import { ButtonLink, ButtonTrash } from '../Ui/Ux/Buttons'

const HeaderPlaylistInfo = ({playlist,isLoading}) => {
  return (
    <section 
    className= {`${isLoading ? 'bg-black/35 ' : ' bg-emerald-400'}   pt-[50px]  inset-0 bg-cover bg-bottom  relative flex flex-col md:flex-row md:items-end items-center gap-5 p-7  min-h-[250px]`}>
          
          
           
          
          
        {
        
            !isLoading &&  (
             
             <div className='flex flex-col md:flex-row gap-8 justify-between w-full items-center'> 
             <div className='flex flex-col gap-2'>
                 <h2 className='text-6xl font-rubick font-bold text-white'>{playlist.name}</h2>
                  <div className='text-sm  p-2 py-1 max-w-max text-white font-rubick font-medium tracking-wider  rounded-full border-2 '>{playlist.tracks?.length} canciones</div>
             </div>
                 <div className=''>
                    {
                         playlist.shared ?
 'esta compartida' : <ButtonLink text={'compartir'} /> 
                       }
                    </div> 
 
             </div> 
        )
        }
          
        </section>  
  )
}

export default HeaderPlaylistInfo   