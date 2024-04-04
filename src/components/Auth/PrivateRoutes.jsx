import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const PrivateRoutes = () => {
  const { token} = useSelector((store)=>store.user)
if(token === ''){
    toast('debes hacer login', {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    
  return <Navigate to={'/'} />
}else{
    return <Outlet />
}
}

export default PrivateRoutes