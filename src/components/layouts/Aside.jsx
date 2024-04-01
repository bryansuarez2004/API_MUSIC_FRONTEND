import React, { useEffect, useState } from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { IoLibraryOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { offModePlay } from '../../store/slices/playTrack.slice';


   



const Aside = () => {
    const dispatch = useDispatch()
    const [currentSection, setCurrentSection] = useState(1)
    
    useEffect(()=>{
        dispatch(offModePlay())
    },[currentSection])



  return (
    <div className='bg-primary md:p-3 fixed  bottom-0 w-full z-20 md:relative  md:h-screen'>
      <div className='flex md:grid bg-secondary rounded-md'>
     <ButtonAside nav={'/' }  page={1} setCurrentSection={setCurrentSection} text={'Home'} currentSection={currentSection} icon={<GrHomeRounded className='text-3xl'/>} />
     <ButtonAside nav={'/playlists' } setCurrentSection={setCurrentSection} currentSection={currentSection} page={2} text={'Playlists'} icon={<IoLibraryOutline className='text-3xl'/>} />
     <ButtonAside nav={'/favorites' } setCurrentSection={setCurrentSection} currentSection={currentSection}  page={3} text={'Favorites'} icon={<AiOutlineHeart className='text-3xl'/>} />
   
      </div>
      <div>
        
      </div>
    
    </div>
  )
}



export const ButtonAside = ({page,icon,text,nav,currentSection,setCurrentSection}) => {
    
   const navigate = useNavigate()

   

   const handleClick = ()=>{
    navigate(nav)
    setCurrentSection(page)
   }


  return (
    <button onClick={handleClick} className={`${ currentSection === page ? 'bg-secondary text-ligter' :'text-zinc-400'}  p-5 flex  items-center gap-3 hover:text-ligter rounded-md `}>{icon} <span className='hidden md:flex  text-2xl font-dongle  pt-1 font-[400] tracking-wide ml-2'>{text}</span></button>
  )
}


export default Aside