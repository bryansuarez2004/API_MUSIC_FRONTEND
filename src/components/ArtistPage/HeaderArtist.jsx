import React from 'react'


const HeaderArtist = ({ArtistInCurrentPage,isLoading}) => {
  
   console.log(ArtistInCurrentPage);

  return (
    <section 
    className= {`pt-[50px]  inset-0 bg-cover bg-bottom bg-black/35 relative flex flex-col md:flex-row md:items-end items-center gap-5 p-7  min-h-[250px]`}>
          
          {
           !isLoading && (<img src={ArtistInCurrentPage.images?.[0].url} className="left-0 top-0 w-full h-full object-cover absolute opacity-50  " alt="Imagen de fondo"></img>)
          }
          
           
          
          <img className="aspect-square max-w-[180px] shadow-xl shadow-black z-10" src={ArtistInCurrentPage.images?.[0].url} alt="" />
          
          <div className="grid z-10 ">
            <h2 className="text-5xl font-rubick font-bold text-white">{ArtistInCurrentPage.name}</h2>
             <div className='flex text-white gap-2 pt-3 flex-wrap font-rubick'>
                {
                  ArtistInCurrentPage.genres?.map((genre,index) => (
                    <div key={genre}  className=' text-sm  p-2 py-1  rounded-full border-2'>
                             {genre}
                         </div>
                         
                         )) 
                }
            </div > 
            <div className='text-gray-300 font-rubick text-sm pt-2 '>
                {
                 ArtistInCurrentPage.followers?.total.toLocaleString('en-US', {useGrouping: true})
                }   {  ArtistInCurrentPage.followers &&  `  seguidores`}
            </div>
          </div>
          
        </section>
  )
}

export default HeaderArtist