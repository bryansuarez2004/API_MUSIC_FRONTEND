import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesTracksThunk } from '../store/slices/user.slice'
import { ButtonLike } from '../components/Ui/Ux/Buttons'

const Favorites = () => {
    const dispatch = useDispatch()
     


 useEffect(()=>{
  dispatch(getFavoritesTracksThunk())
 },[])


  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
     
     
    <ButtonLike />
     

    </div>
    </div>
  )
}

export default Favorites