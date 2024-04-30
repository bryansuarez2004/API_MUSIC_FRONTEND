import React from 'react'
import PlaylistCard from './PlaylistCard'

const PlaylistsList = ({playlists,isLoading}) => {
  return (
    <div className='  p-3 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 '>

    {
       isLoading && [1,2,3,4,5,6,7,8,9,1,11,12].map((e)=>{
                return <div key={e} className='w-full bg-tertiary/30 flex gap-2 p-2   h-[90px] rounded-2xl animate-pulse'>
                   <div className=' grow h-full bg-primary/60 rounded-2xl animate-pulse'>
                   </div>
                   <div className='w-[20%] flex flex-col h-full gap-1 '>
                     <div className='h-[50%] w-full bg-primary/60 rounded-xl animate-pulse'>

                     </div>
                     <div className='grow w-full bg-primary/60 rounded-xl animate-pulse'>

                     </div>
                   </div>
                </div> 
       })
    }

       

    {
    playlists.map((playlist)=>{
        return <PlaylistCard key={playlist.id} playlist={playlist} />
    })
    }
     </div>
  )
}

export default PlaylistsList