import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMainTracksThunk } from '../store/slices/tracksHome.slice'
import Search from '../components/HomePage/Search'
import TrackList from '../components/shared/TrackList'
import ArtistSlider from '../components/HomePage/ArtistSlider'
import Account from '../components/layouts/Account'
import Footer from '../components/layouts/Footer'

const Home = () => {
    const dispatch = useDispatch()
   const {tracks,isLoading} = useSelector((store)=>store.tracksHome)
    const {modeBackPack} = useSelector((store)=>store.user)


    useEffect(()=>{

      if(tracks.length === 0 ){
        
        dispatch(getMainTracksThunk())
      }
       
      
     //condicionar la peticion para que no se haga cada que este componenete vuelve a la vida
     // en cada cambio de pagina y no haya peticion innecesaria, aparte de que
     //se mantengan los datos buscados

    },[])

  return (
    <>
    
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto customScroll pb-[100px] md:pb-[20px] '>
    
  <ArtistSlider />

    <Search />
    <div className='font-rubick text-2xl font-bold pl-6 text-white'>Canciones</div>
   <TrackList tracks={tracks} isLoading={isLoading} btnLike btnBackPack />

     
    <Footer />

   


    </div>
    </div>

    {
      !isLoading && <Account />
    }
       
    </>
  )
}

export default Home