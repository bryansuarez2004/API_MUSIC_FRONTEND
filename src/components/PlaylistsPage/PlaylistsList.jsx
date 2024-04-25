import React from 'react'
import PlaylistCard from './PlaylistCard'

const PlaylistsList = ({playlists}) => {
  return (
    <div className='  p-3 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 '>

    {
    playlists.map((playlist)=>{
        return <PlaylistCard key={playlist.id} playlist={playlist} />
    })
    }
     </div>
  )
}

export default PlaylistsList