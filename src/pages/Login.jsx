import React, { useEffect } from 'react'
import { ButtonToHome } from '../components/Ui/Ux/Buttons'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserThunk } from '../store/slices/user.slice'
import axios from "axios";
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { IoEye, IoEyeOffSharp } from 'react-icons/io5'

const Login = () => {

   


  return (
    <div className='bg-primary min-h-screen justify-evenly  md:flex-row flex  items-center pt-12'>
    
      
    <img className='w-[75%] max-w-[450px] hidden md:block '  src="/images/login.png" alt="" />
    <ButtonToHome />
    <FormLogin />
</div>
  )
}



const FormLogin = () => {
 
  const {register,handleSubmit,formState} = useForm()
   const {errors} = formState
   const dispatch = useDispatch()
   const [focusInput2, setFocusInput2] = useState(false)
 const [focusInput1, setFocusInput1] = useState(false)
 const navigate = useNavigate()
  const [modePassword, setModePassword] = useState(true)

  const submitLogin = handleSubmit((data)=>{
     console.log(data);
     dispatch(loginUserThunk(data,navigate))


     
  })

 return (
   <form  onSubmit={submitLogin} className='gap-3  p-2 grow max-w-[90%] md:max-w-[450px] grid '>
       <span className='text-4xl font-bold text-white font-rubick'>INICIA SESION</span>
     
       <div className='flex flex-col'>
        <label className={`${focusInput1 && !errors.email ? ' text-ligter' : 'text-gray-300'} font-rubick text-lg `} htmlFor="">Email</label>
        <input onBlurCapture={()=>setFocusInput1(false)} onFocus={()=>setFocusInput1(true)}  className={`${errors.email ?'border-error' : 'border-gray-300 focus:border-ligter'}  text-gray-300 p-2 rounded-md bg-primary font-rubick outline-none border-2  `}  {...register('email',{
         required:{
           value:true,
           message:'email es requerido'
         },
         pattern:{
          value:/.*@.*/,
          message:'el email debe ser valido'
         }

        })} type="text" />
        {errors.email && <span className='text-error font-rubick text-sm'>{errors.email.message}</span> }
       </div>  
       <div className='flex flex-col '>
        <label  className={`${focusInput2 && !errors.password ? ' text-ligter' : 'text-gray-300'} font-rubick text-lg `} htmlFor="">Contraseña</label>
        <div className={`${errors.password ?'border-error' : `${focusInput2 ? 'border-ligter' : 'border-gray-300'}`} flex gap-2 border-2  rounded-lg `}>
          
        <input type={modePassword? 'password':'text'} onBlurCapture={()=>setFocusInput2(false)} onFocus={()=>setFocusInput2(true)}  className={`  text-gray-300 p-2 rounded-md bg-primary grow  outline-none font-rubick `} {...register('password',{
         required:{
           value:true,
           message:'password es requerido'
         },

        })}/>
        <div onClick={()=>setModePassword(!modePassword)} className=' p-1 pr-2  flex items-center cursor-pointer'>
          {
            modePassword ?
            <IoEyeOffSharp  className={` ${focusInput2 ? ' text-ligter' :'text-gray-300'} text-2xl`} />
            :
            <IoEye  className={` ${focusInput2 ? ' text-ligter' :'text-gray-300'} text-2xl`} />
          }
       
        </div>
        </div> 
        {errors.password && <span className='text-error font-rubick text-sm'>{errors.password.message}</span> }
       </div>  

       <div className=' text-gray-300 font-dongle text-2xl'>si no tienes una cuenta creada, creala en <Link to={'/register'} className='hover:underline  text-ligter font-dongle text-2xl'>register</Link> </div>
       <button className='bg-primary border-2 border-gray-300 hover:text-ligter hover:border-ligter transition-all duration-300 hover:tracking-widest active:scale-90 mx-auto p-3 py-2 w-[30%] rounded-3xl font-rubick text-gray-300  text-lg'>Iniciar</button>
       
   </form>
 )
}
export default Login