// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



// import required modules
const width = window.innerWidth


const Albums = ({ArtistInCurrentPage}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {modePlay}=useSelector((store)=>store.playTrack)
 
 const getWidth = () =>{
   if(windowWidth < 700){
    const widthSlide =  windowWidth - 200
    return widthSlide
   }
   const widthSlide =  windowWidth - 300
    return widthSlide
   
 }

 useEffect(()=>{
  if(modePlay){
    const newwidth = width - (width * 0.3)
    console.log('nuevo width' + (newwidth - 20));
    setWindowWidth(newwidth)
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
    
    if(windowWidth > 600 ){
      if(modePlay){
        slidesPerView = 3
       }else{
        slidesPerView = 4
       } 
     }


    
    if(windowWidth > 900 ){
       if(modePlay){
        slidesPerView = 5
       }else{
        slidesPerView = 6
       } 
    }
    if(windowWidth > 1200 ){
      if(modePlay) {
        slidesPerView = 6
      } else {
        slidesPerView = 7
      }

   }
   return slidesPerView
 }
 console.log(getSlidesPerView());



  console.log(windowWidth);
  return (
    <>
      {
ArtistInCurrentPage.name && 
<div>
  <div className='font-rubick text-sm pl-5 pt-8 text-gray-300'>
    Albums de
  </div>
  <div className='font-rubick text-2xl font-bold pl-5 pb-8 text-white'>
    {ArtistInCurrentPage.name}
  </div>
</div>
            }
      <div style={{maxWidth: `${getWidth()}px`}} className='   mx-auto p-10 pt-0 transition-all duration-500  '>
      <Swiper
            slidesPerView={getSlidesPerView()}
            spaceBetween={30}
            
            className="mySwiper w-full  "
          >
         {
           ArtistInCurrentPage.albums?.map((album)=>{
            return (
            <SwiperSlide key={album.id}>
                 <article>
                    <img className='rounded-md w-full aspect-square' src={album.images[1].url} alt="" />
                    <h5 className=' text-sm font-rubick line-clamp-1 pt-2 font-medium text-white'>{album.name}</h5>
                     <h6 className='text-xs font-rubick line-clamp-1 text-gray-400'>{album.artists[0].name}</h6>
                 </article>
           </SwiperSlide>

            )
           })

            }
           
           


        </Swiper>
      </div>
    </>
  )
}

export default Albums