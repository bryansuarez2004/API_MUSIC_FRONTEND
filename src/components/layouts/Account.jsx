import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutSesion } from '../../store/slices/user.slice';

const Account = () => {
    const [modeAccount, setModeAccount] = useState(false)
    const {token} = useSelector((store)=>store.user)



    const handleAccount = ()=>{
        console.log('esta dando click a acount');
        setModeAccount(!modeAccount)
    }

  return (
    <div  className=' flex justify-end absolute top-0 right-0 md:right-[13px] md:top-[13px] p-2 bg-transparent'>
      <div className='relative'>
        <FaUserCircle onClick={handleAccount} className={`${ token === '' ? 'text-white' : 'text-ligter'} text-3xl cursor-pointer  `} /> <Options modeAccount={modeAccount} /> 
        {
          token === '' && (        <div className={` ${modeAccount ? 'hidden' : 'block' }  absolute aspect-square w-3 bg-orange-500 pointer-events-none rounded-full right-0 bottom-0 animate-pulse`}>
          </div>)
        }
        

        
        </div>
        
        </div>
  )
}


const Options = ({modeAccount}) => {
    const navigate = useNavigate()
    const {token} = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    



  const handleLogOut = ()=>{
    console.log('cerrando sesion');
    dispatch(logOutSesion())
    navigate('/login')
  }

  return (
    <div className={ `${modeAccount ? 'top-[40px] opacity-100' : ' top-[-150px] opacity-0'}   bg-tertiary absolute z-50 right-0 p-1 rounded-md grid w-[150px] gap-2 text-white transition-all duration-500`}>
{
  token === '' ?
   <>
   <a  href='/login'  className=' p-2 rounded-md hover:bg-teal-500  cursor-pointer text-2xl font-dongle'>LOGIN</a>
   <a href='/register' className=' p-2 rounded-md hover:bg-zinc-500 cursor-pointer text-2xl font-dongle '>REGISTER</a>
   </>
  : 
  <>
  <div onClick={handleLogOut} className=' p-2 rounded-md hover:bg-red-500 cursor-pointer text-2xl font-dongle '>CERRAR SESION</div>

  </>
}
 

    </div>
  )
}



export default Account