import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesTracksThunk } from '../store/slices/user.slice'
import { ButtonLike } from '../components/Ui/Ux/Buttons'
import TrackList from '../components/shared/TrackList'
import HeaderFavorites from '../components/FavoritesPage/HeaderFavorites'
import Account from '../components/layouts/Account'
import Footer from '../components/layouts/Footer'

const Favorites = () => {
    const dispatch = useDispatch()
     const {favorites} = useSelector((store)=>store.user)

   


  return (
    <>
    <div className='bg-primary md:p-3  md:pl-0  h-screen  pb-[40px] md:pb-[30px]' >

    <div style={{
            background: `linear-gradient(180deg, rgba(190, 18, 60, 0.7) 0%, rgba(253,45,45,0) 80%)`,
          }} className='bg-secondary rounded-md h-[100%] overflow-auto customScroll'>
      <HeaderFavorites isLoading={favorites.isLoading} />
     
         {
           (favorites.tracks.length === 0 && !favorites.isLoading) && <span className='text-white font-rubick p-5'>Usa este espacio para guardar aquellas canciones que te gustaron</span>
          }
        <div className='flex flex-col justify-between min-h-[350px] mb-[60px] md:mb-0'>
          <TrackList isLoading={favorites.isLoading} tracks={favorites.tracks} btnLike />     

 <Footer />
</div> 


    </div>
    </div>

    {
      !favorites.isLoading  && <Account />
    }
    </>
  )
}

export default Favorites