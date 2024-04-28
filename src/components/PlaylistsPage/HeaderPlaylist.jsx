import React from 'react'

const HeaderPlaylist = ({isLoading}) => {
  return (
    <section 
    className= {`${isLoading ? ' bg-black/35' : ' bg-green-600'} pt-[50px]  inset-0 bg-cover bg-bottom  relative flex flex-col md:flex-row md:items-end items-center gap-5 p-7  min-h-[250px]`}>
          
          
           
          
          
        <h2 className='text-6xl font-rubick font-bold text-white'>Tus playlists</h2>
          
        </section>
  )
}

export default HeaderPlaylist