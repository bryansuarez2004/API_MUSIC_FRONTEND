import React, { useState } from 'react'
import { ButtonTrash } from '../Ui/Ux/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlaylistThunk, removePlaylist } from '../../store/slices/user.slice'
import { Link, useNavigate } from 'react-router-dom'
import { changePage } from '../../store/slices/page.slice'
import { numeroAleatorio } from "../../utils/getRandomNum";




const colors = {
  1 : "bg-green-400",
  2 : "bg-teal-400",
  3: "bg-cyan-400"
} 


const PlaylistCard = ({playlist}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
 const [number, setNumber] = useState(numeroAleatorio())

 
  console.log(colors[1]);

   const handleRemovePlaylist = (id,e) =>{
    e.stopPropagation()
       dispatch(deletePlaylistThunk(id))
       console.log(id);
   }

   const handleClickPlaylist = ( ) =>{
    navigate(`/playlists/${playlist.id}`)
    dispatch(changePage(0))
   }


   const afterStyle = {
   
    backgroundColor: 'red',
  };

  return (
    <div onClick={handleClickPlaylist} className={`card `}>
        <div className={`z-10 w-full h-full ${colors[number]} p-3 rounded-md`}>
        <h2>{playlist.name}</h2>
       <p>{playlist.shared ? ' playlists compartida ' : 'playlist no compartida'} </p>
       <p>{playlist.tracks.length}</p>   
       <ButtonTrash functionToDelete={handleRemovePlaylist} id={playlist.id} stiles={''} />
        </div>
       
    </div>
  )
}

export default PlaylistCard