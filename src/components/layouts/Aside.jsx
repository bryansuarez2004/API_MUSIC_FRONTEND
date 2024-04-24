import React, { useEffect, useState } from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { IoLibraryOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { offModePlay } from '../../store/slices/playTrack.slice';
import { ToastContainer, toast } from 'react-toastify';
import { TbBackpack } from "react-icons/tb";
import BackPack from './BackPack';
import { changePage } from '../../store/slices/page.slice';


   



const Aside = () => {
    const dispatch = useDispatch()
  
    const [modeBackPack, setModeBackPack] = useState(false)
    const {token}=  useSelector((store)=>store.user)
    const {currentPage}=  useSelector((store)=>store.page)

    
    useEffect(()=>{
        dispatch(offModePlay())
    },[currentPage])


    const handleTracksForPlaylist = ()=> {
     if(token !== ''){
       setModeBackPack(!modeBackPack)

     }else{
      toast.warn("Debes hacer login para acceder a una mochila  ", {
        autoClose: 1600,
closeOnClick: true,
pauseOnHover: false,
      });
     }

    }


  return (
    <div className='bg-primary md:p-3 fixed flex flex-col  bottom-0 w-full z-50 md:relative  md:h-screen'>
      <div className='flex justify-evenly md:justify-normal md:grid bg-secondary rounded-md  relative z-20'>
     <ButtonAside nav={'/' }  page={1}  text={'Home'} currentSection={currentPage} icon={<GrHomeRounded className='text-3xl'/>} />
     <ButtonAside nav={'/playlists' }  currentSection={currentPage} page={2} text={'Playlists'} icon={<IoLibraryOutline className='text-3xl'/>} />
     <ButtonAside nav={'/favorites' }  currentSection={currentPage}  page={3} text={'Favorites'} icon={<AiOutlineHeart className='text-3xl'/>} />
     <button onClick={handleTracksForPlaylist} className=' p-5 flex  items-center gap-3  rounded-md '>
     <TbBackpack className='text-3xl text-zinc-400 hover:text-ligter '/>
     <span className='hidden md:block pl-2  text-2xl pt-2 text-zinc-400 font-dongle'>{modeBackPack ? 'Cerrar mochila' : 'Abrir mochila'}</span> 
     </button>
      </div>
     
     <BackPack modeBackPack={modeBackPack}/>
        
    
    
    </div>
  )
}



export const ButtonAside = ({page,icon,text,nav,currentSection}) => {
    const  {token} = useSelector((store)=> store.user)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   

   const handleClick = ()=>{

    if(page === 1){
      navigate(nav)
      dispatch(changePage(page))
      
    }else{
      if(token !== ''){
        //logica que se hace cuando tiene token
        navigate(nav)
        dispatch(changePage(page))

       
      }else{
        toast.warn("Debes hacer login", {
          autoClose: 1600,
  closeOnClick: true,
  pauseOnHover: false,
        });
      } 


    }
    
    
    
   }


  return (
    <button onClick={handleClick} className={`${ currentSection === page ? 'bg-secondary text-ligter' :'text-zinc-400'}  p-5 flex  items-center gap-3 hover:text-ligter rounded-md `}>{icon} <span className='hidden md:flex  text-2xl font-dongle  pt-1 font-[400] tracking-wide ml-2'>{text}</span></button>
  )
}


export default Aside