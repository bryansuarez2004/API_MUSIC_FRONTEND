import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onModePlay } from '../store/slices/playTrack.slice'
import { getMainTracksThunk } from '../store/slices/tracksHome.slice'
import Search from '../components/HomePage/Search'
import TrackList from '../components/shared/TrackList'

const Home = () => {
    const dispatch = useDispatch()

    


    useEffect(()=>{
        dispatch(getMainTracksThunk())
    },[])

  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
    <Search />
   <TrackList />

     

    </div>
    </div>
  )
}

export default Home