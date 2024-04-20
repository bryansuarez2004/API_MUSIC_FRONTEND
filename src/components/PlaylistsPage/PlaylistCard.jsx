import React from 'react'
import { ButtonTrash } from '../Ui/Ux/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlaylistThunk, removePlaylist } from '../../store/slices/user.slice'
import { Link } from 'react-router-dom'


const PlaylistCard = ({playlist}) => {
    const dispatch = useDispatch()

  console.log(playlist.id);

   const handleRemovePlaylist = (id) =>{
       dispatch(deletePlaylistThunk(id))
       console.log(id);
   }


  return (
    <Link to={`/playlists/${playlist.id}`} className='card '>
        <div className='z-10'>
        <h2>{playlist.name}</h2>
       <p>{playlist.shared ? ' playlists compartida ' : 'playlist no compartida'} </p>
       <p>{playlist.tracks.length}</p>   
       <ButtonTrash functionToDelete={handleRemovePlaylist} id={playlist.id} stiles={''} />
        </div>
       
    </Link>
  )
}

export default PlaylistCard