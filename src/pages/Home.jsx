import React from 'react'
import { useDispatch } from 'react-redux'
import { onModePlay } from '../store/slices/playTrack.slice'

const Home = () => {
    const dispatch = useDispatch()

    const handleOpenMusic = ()=>{
        dispatch(onModePlay())
    }

  return (
    <div className='bg-secondary md:m-3 md:ml-0 rounded-md '>
     <button onClick={handleOpenMusic}>dame click</button>

    </div>
  )
}

export default Home