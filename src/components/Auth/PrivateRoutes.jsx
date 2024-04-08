import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoutes = () => {

  const { token} = useSelector((store)=>store.user)
if(token === ''){
    
    
  return <Navigate to={'/'} />
}else{
    return <Outlet />
}
}

export default PrivateRoutes