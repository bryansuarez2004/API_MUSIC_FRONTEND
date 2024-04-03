import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onModePlay } from '../store/slices/playTrack.slice'
import { getMainTracksThunk } from '../store/slices/tracksHome.slice'
import Search from '../components/HomePage/Search'
import TrackList from '../components/shared/TrackList'

const Home = () => {
    const dispatch = useDispatch()
   const {tracks,isLoading} = useSelector((store)=>store.tracksHome)
    


    useEffect(()=>{

      if(tracks.length === 0 ){
        
        dispatch(getMainTracksThunk())
      }
     //condicionar la peticion para que no se haga cada que este componenete vuelve a la vida
     // en cada cambio de pagina y no haya peticion innecesaria, aparte de que
     //se mantengan los datos buscados

    },[])

  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
    <Search />
   <TrackList tracks={tracks} isLoading={isLoading} />

     

    </div>
    </div>
  )
}

export default Home