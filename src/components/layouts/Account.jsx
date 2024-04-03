import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [modeAccount, setModeAccount] = useState(false)


    const handleAccount = ()=>{
        console.log('esta dando click a acount');
        setModeAccount(!modeAccount)
    }

  return (
    <div  className=' flex justify-end absolute top-0 right-0 md:right-[13px] md:top-[13px] p-2 bg-transparent'><div className='relative'>
        <FaUserCircle onClick={handleAccount} className='text-white text-3xl cursor-pointer  ' /> <Options modeAccount={modeAccount} /> </div></div>
  )
}


const Options = ({modeAccount}) => {
    const navigate = useNavigate()
    

  const handleToLogin = ()=>{
    navigate('/login')
  }  
  const handleToRegister = ()=>{
    navigate('/register')

  }

  return (
    <div className={ `${modeAccount ? 'top-[40px] opacity-100' : ' top-[-150px] opacity-0'}   bg-tertiary absolute z-50 right-0 p-1 rounded-md grid w-[150px] gap-2 text-white transition-all duration-500`}>
   <div onClick={handleToLogin} className=' p-2 rounded-md hover:bg-teal-500  cursor-pointer text-2xl font-dongle'>LOGIN</div>
   <div onClick={handleToRegister} className=' p-2 rounded-md hover:bg-zinc-500 cursor-pointer text-2xl font-dongle '>REGISTER</div>
 

    </div>
  )
}



export default Account