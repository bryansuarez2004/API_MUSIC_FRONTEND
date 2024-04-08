import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onModePlay } from '../store/slices/playTrack.slice'
import { getMainTracksThunk } from '../store/slices/tracksHome.slice'
import Search from '../components/HomePage/Search'
import TrackList from '../components/shared/TrackList'
import ArtistSlider from '../components/HomePage/ArtistSlider'
import { getFavoritesTracksThunk } from '../store/slices/user.slice'

const Home = () => {
    const dispatch = useDispatch()
   const {tracks,isLoading} = useSelector((store)=>store.tracksHome)
   const {favorites} = useSelector((store)=>store.user)
    


    useEffect(()=>{

      if(tracks.length === 0 ){
        
        dispatch(getMainTracksThunk())
      }
       
      if(favorites.tracks.length === 0 ){

        dispatch(getFavoritesTracksThunk())
      }
     //condicionar la peticion para que no se haga cada que este componenete vuelve a la vida
     // en cada cambio de pagina y no haya peticion innecesaria, aparte de que
     //se mantengan los datos buscados

    },[])

  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
    
  <ArtistSlider />

    <Search />
    <div className='font-rubick text-2xl font-bold pl-6 text-white'>Canciones</div>
   <TrackList tracks={tracks} isLoading={isLoading} btnLike />

     

    </div>
    </div>
  )
}

export default Home