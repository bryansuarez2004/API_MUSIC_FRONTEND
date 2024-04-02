import React, { useEffect, useState } from 'react'
import HeaderArtist from '../components/ArtistPage/HeaderArtist'
import { axiosMusic } from '../utils/configAxios'
import { useParams } from 'react-router-dom'
import Albums from '../components/ArtistPage/Albums'

const Artists = () => {

  const [ArtistInCurrentPage, setArtistInCurrentPage] = useState({})
  const [isLoading, setIsLoading] = useState(true) 

  const {id} = useParams()

   useEffect(()=>{
  setIsLoading(true)

     axiosMusic(`/artists/${id}`)
     .then(({data})=> {setArtistInCurrentPage(data)
      setIsLoading(false)
    })
     .catch((err)=> console.log(err))
   },[])


  return (
    <div className='bg-primary md:p-3  md:pl-0  h-screen '>

    <div className='bg-secondary rounded-md h-[100%] overflow-auto'>
   
       <HeaderArtist ArtistInCurrentPage={ArtistInCurrentPage} isLoading={isLoading} />
       <div style={{background:`linear-gradient(180deg, rgba(34,193,195,0.7) 0%, rgba(253,45,45,0) 78%)`}}>

        <Albums />
       </div>
     

    </div>
    </div>
  )
}

export default Artists