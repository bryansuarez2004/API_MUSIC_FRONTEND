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


   

  return (
    <div onClick={handleClickPlaylist} className={`card `}>
        <div className={`z-10 w-full flex  h-full ${colors[number]}  p-4 rounded-2xl cursor-pointer`}>
          <div className={'grow'}>

        <div className={' font-rubick font-semibold text-4xl  '} >{playlist.name}</div>
       <p className={'font-rubick text-xs    '} >{playlist.shared ? ' playlists compartida ' : 'playlist no compartida'} </p>
       <p className={'font-rubick text-xs    '}>{playlist.tracks.length} canciones</p>   
          </div>
          <div className={'grid gap-3'}>

       <ButtonTrash functionToDelete={handleRemovePlaylist} id={playlist.id} stiles={'scale-[1.4]'} />
          </div>
        </div>
       
    </div>
  )
}

export default PlaylistCard