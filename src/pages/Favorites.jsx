import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesTracksThunk } from '../store/slices/user.slice'
import { ButtonLike } from '../components/Ui/Ux/Buttons'
import TrackList from '../components/shared/TrackList'
import HeaderFavorites from '../components/FavoritesPage/HeaderFavorites'
import Account from '../components/layouts/Account'

const Favorites = () => {
    const dispatch = useDispatch()
     const {favorites} = useSelector((store)=>store.user)

   


  return (
    <>
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div style={{
            background: `linear-gradient(180deg, rgba(190, 18, 60, 0.7) 0%, rgba(253,45,45,0) 80%)`,
          }} className='bg-secondary rounded-md h-[100%] overflow-auto'>
      <HeaderFavorites isLoading={favorites.isLoading} />
     
    <TrackList isLoading={favorites.isLoading} tracks={favorites.tracks} btnLike />     
         {
           favorites.tracks.length === 0 && <span className='text-white font-rubick p-5'>Usa este espacio para guardar aquellas canciones que te gustaron</span>
         }
    </div>
    </div>

    {
      !favorites.isLoading  && <Account />
    }
    </>
  )
}

export default Favorites