import React, { useEffect, useState } from 'react'
import { ButtonTrash } from '../Ui/Ux/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlaylistThunk, removePlaylist, sharePlaylist } from '../../store/slices/user.slice'
import { Link, useNavigate } from 'react-router-dom'
import { changePage } from '../../store/slices/page.slice'
import { numeroAleatorio } from "../../utils/getRandomNum";
import { toast } from 'react-toastify'
import { axiosMusic } from '../../utils/configAxios'
import { FiExternalLink } from 'react-icons/fi'
import { FaLink } from 'react-icons/fa6'




const colors = {
  1 : "bg-green-400",
  2 : "bg-teal-400",
  3: "bg-cyan-400"
} 


const PlaylistCard = ({playlist}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
 const [number, setNumber] = useState(numeroAleatorio())



   const handleRemovePlaylist = (id,e) =>{
    e.stopPropagation()
       dispatch(deletePlaylistThunk(id))
       console.log(id);
   }

   const handleClickPlaylist = ( ) =>{
    navigate(`/playlists/${playlist.id}`)
    dispatch(changePage(0))
   }

   const handleShared =(e,idPlaylist) =>{
    e.stopPropagation()
      
    const id = toast.loading("Colocando playlist en modo publica");

    axiosMusic
      .put(`/playlists/${idPlaylist}/changeToShared`)
      .then(({ data }) => {
        toast.update(id, {
          render: `Playlist en modo publica, ahora copia el link y compartelo con tus amigos`,
          type: "success",
          isLoading: false,
          autoClose: 2500,
          pauseOnHover: false,
          closeOnClick: true,
        });
        
        dispatch(sharePlaylist(idPlaylist))
        console.log(data);
      })
      .catch((err) => {
        toast.update(id, {
          render: `Ocurrio un error, intente denuevo`,
          type: "error",
          isLoading: false,
          autoClose: 1700,
          pauseOnHover: false,
          closeOnClick: true,
        });

        console.log(err);
      });



      
   }
   

   const handleGetLink =(e,idPlaylist)=>{
    e.stopPropagation()

    const currentUrl = window.location.origin
    const urlCopy = `${currentUrl}/sharedPlaylist/${idPlaylist}`


    navigator.clipboard
      .writeText(urlCopy)
      .then(()=>{
        toast.success("Link copiado, compartelo con tus amigos  ", {
          autoClose: 1600,
  closeOnClick: true,
  pauseOnHover: false,
        });
      })


   }

  return (
    <div onClick={handleClickPlaylist} className={`card `}>
        <div className={`z-10 w-full flex  h-full ${colors[number]}  p-4 rounded-2xl cursor-pointer`}>
          <div className={'grow'}>

        <div className={' font-rubick font-semibold text-4xl  '} >{playlist.name}</div>
      
       <p className={'font-rubick text-xs    '}>{playlist.tracks.length} canciones</p>   
          </div>
          <div className={'flex flex-col items-center  gap-3'}>

       <ButtonTrash functionToDelete={handleRemovePlaylist} id={playlist.id} stiles={'scale-[1.4]'} />
       {playlist.shared ? 
         <button onClick={(e)=>handleGetLink(e,playlist.id)} title="Obtener Link" className="p-[4px] py-[6.5px] hover:bg-gray-700 group bg-gray-500 border-2 border-transparent rounded-lg"
         >

<FaLink className="text-xl text-white group-hover:scale-[1.1] transition-all duration-300"  />
         </button>
       : 
        <button onClick={(e)=>handleShared(e,playlist.id)} title="Compartir" className="p-[4px] py-[6.5px] hover:bg-sky-900 group bg-sky-600 border-2 border-transparent rounded-lg"
        >
         <FiExternalLink  className="text-xl text-white group-hover:scale-[1.1] transition-all duration-300"  />

        </button>
       } 
          </div>
        </div>
       
    </div>
  )
}

export default PlaylistCard