import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesTracksThunk } from '../store/slices/user.slice'
import { ButtonLike } from '../components/Ui/Ux/Buttons'
import TrackList from '../components/shared/TrackList'

const Favorites = () => {
    const dispatch = useDispatch()
     const {favorites} = useSelector((store)=>store.user)

   


  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
     
     
    <TrackList isLoading={favorites.isLoading} tracks={favorites.tracks} />     

    </div>
    </div>
  )
}

export default Favorites