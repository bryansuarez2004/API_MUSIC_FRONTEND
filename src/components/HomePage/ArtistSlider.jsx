import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMainArtistsThunk } from '../../store/slices/tracksHome.slice'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useNavigate } from 'react-router-dom';



const width = window.innerWidth


const ArtistSlider = () => {
        const dispatch = useDispatch()
    const {artists,isLoadingArtist} = useSelector((store)=>store.tracksHome)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {modePlay}=useSelector((store)=>store.playTrack)
  const navigate = useNavigate()


    useEffect(()=>{
        if(artists.length === 0 ){

            dispatch(getMainArtistsThunk())
        }
          

    },[])
 console.log(artists);


 const getWidth = () =>{
    if(windowWidth < 700){
     const widthSlide =  windowWidth - 40
     return widthSlide
    }
    const widthSlide =  windowWidth - 320
     return widthSlide
    
  }
 
  useEffect(()=>{
   if(modePlay){
     const newwidth = width - (width * 0.3)
     console.log('nuevo width' + (newwidth - 20));
     setWindowWidth(newwidth - 20)
   }else{
  setWindowWidth(width)
     console.log( 'nuevo width' + width);
   }
 },[modePlay])
 
  const getSlidesPerView = () => {
   let slidesPerView = 2
    if(windowWidth > 500 ){
       slidesPerView = 3
   
 
     }
     
     if(windowWidth > 700 ){
        slidesPerView = 4
 
      }
 
      if(windowWidth > 800 ){
       slidesPerView = 5
       
     }
     
     if(windowWidth > 900 ){
        slidesPerView = 7
        if(modePlay){
         slidesPerView = 4
        }else{
         slidesPerView = 5
        } 
     }
     if(windowWidth > 1200 ){
       if(modePlay) {
         slidesPerView = 5
       } else {
         slidesPerView = 6
       }
 
    }
    return slidesPerView
  }




  const handleToArtist = (id)=>{
    navigate(`/artist/${id}`)
  }







  return (
    <div className=''>
         <div className='font-rubick text-2xl font-bold text-white p-5'>
            Artistas Top
         </div>
    <div style={{maxWidth: `${getWidth()}px`}} className='   mx-auto p-6 pt-0 transition-all duration-500  '>
      {
        isLoadingArtist 
        ? 
        (<Swiper
            slidesPerView={getSlidesPerView()}
            spaceBetween={30}
            
            className="mySwiper w-full active:cursor-grabbing  "
          >
         {
           [1,2,3,4,5,6,7,8,9,10].map((element)=>{
            return (
            <SwiperSlide key={element}>
                 <article className='max-w-[160px]'>
                    <div className='aspect-square w-full p-2 bg-tertiary/30 rounded-md  animate-pulse '>
                      <div className='aspect-square w-[90%] bg-secondary rounded-md animate-pulse mb-2 mx-auto'>

                      </div>
                      <div className='h-[10%] w-[90%] bg-secondary rounded-md animate-pulse mx-auto'>

                      </div>
                    </div>
                 </article>
           </SwiperSlide>
    
            )
           })
    
            }
           
           
    
    
        </Swiper>)
        :  
        (<Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={30}
        
        className="mySwiper w-full active:cursor-grabbing  "
      >
     {
       artists.map((artist)=>{
        return (
        <SwiperSlide key={artist.id}>
             <article className='max-w-[160px]'>
                <img onClick={()=>handleToArtist(artist.id)} className='active:cursor-grabbing transition-all duration-500 hover:scale-105 rounded-md cursor-pointer  w-full aspect-square' src={artist.images[1].url} alt="" />
                <h5 className=' text-sm font-rubick line-clamp-1 pt-2 font-medium text-white'>{artist.name}</h5>
             </article>
       </SwiperSlide>

        )
       })

        }
       
       


    </Swiper>)
      }
      
      
     
      </div>
 
    </div>
  )
}







export default ArtistSlider