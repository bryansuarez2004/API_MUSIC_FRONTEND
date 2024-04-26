import React, { useEffect } from 'react'
import { ButtonToHome } from '../components/Ui/Ux/Buttons'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from 'react';


const Register = () => {
 

  return (
    <div className='bg-primary min-h-screen justify-evenly  md:flex-row flex  items-center pt-12'>
    
      
    <img className='w-[75%] max-w-[450px] hidden md:block '  src="/images/registerfot.png" alt="" />
    <ButtonToHome />
<FormRegister />
</div>
  )
}



const FormRegister = () => {
 const navigate = useNavigate()
  const {register,handleSubmit,formState} = useForm()
   const {errors} = formState
   const [focusInput1, setFocusInput1] = useState(false)
   const [focusInput2, setFocusInput2] = useState(false)
   const [focusInput3, setFocusInput3] = useState(false)
 


  const submitRegister = handleSubmit((data)=>{


     console.log(data);
     const id = toast.loading("Creando cuenta...")

     axios.post('https://api-music-backend.onrender.com/users/register',data)
     .then(({data})=>{
        console.log(data);
      toast.update(id, { render: `cuenta creada con exito`, type: "success", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true, });
       navigate('/login')

     })
      .catch((err)=>{
       if(err.response.data.error.errors[0].message === 'email must be unique'){
        toast.update(id, { render: `Este email ya esta en uso`, type: "error", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true });

       }else{

         toast.update(id, { render: `algo salio mal, porfavor intente denuevo`, type: "error", isLoading: false, autoClose:1700,pauseOnHover: false,closeOnClick: true });
       }
         console.log(err);
      })
   

     
  })

 return (
   <form  onSubmit={submitRegister} className='gap-3  p-2 grow max-w-[90%] md:max-w-[450px] grid '>
       <span className='text-3xl font-bold text-white font-rubick'>REGISTRATE</span>
        
       <div className='flex flex-col'>
        <label className={`${focusInput1 && !errors.name ? ' text-ligter' : 'text-gray-300'} font-rubick text-lg `} htmlFor="">Nombre</label>
        <input onBlurCapture={()=>setFocusInput1(false)} onFocus={()=>setFocusInput1(true)}  className={`${errors.name ?'border-error' : 'border-gray-300 focus:border-ligter'}  text-gray-300 p-2 rounded-md bg-primary font-rubick outline-none border-2  `}  {...register('name',{
         required:{
           value:true,
           message:'nombre es requerido'
         }
  

        })} type="text" />
        {errors.name && <span className='text-error font-rubick text-sm'>{errors.name.message}</span> }
       </div> 



       <div className='flex flex-col'>
        <label className={`${focusInput2 && !errors.email ? ' text-ligter' : 'text-gray-300'} font-rubick text-lg `} htmlFor="">email</label>
        <input onBlurCapture={()=>setFocusInput2(false)} onFocus={()=>setFocusInput2(true)}  className={`${errors.email ?'border-error' : 'border-gray-300 focus:border-ligter'}  text-gray-300 p-2 rounded-md bg-primary font-rubick outline-none border-2  `}  {...register('email',{
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
       <div className='flex flex-col'>
        <label className={`${focusInput3 && !errors.password ? ' text-ligter' : 'text-gray-300'} font-rubick text-lg `} htmlFor="">contraseña</label>
        <input onBlurCapture={()=>setFocusInput3(false)} onFocus={()=>setFocusInput3(true)}  className={`${errors.password ?'border-error' : 'border-gray-300 focus:border-ligter'}  text-gray-300 p-2 rounded-md bg-primary font-rubick outline-none border-2  `} {...register('password',{
         required:{
           value:true,
           message:'password es requerido'
         },

        })} type="text" />
        {errors.password && <span className='text-error font-rubick text-sm'>{errors.password.message}</span> }
       </div>  

       <div className=' text-gray-400 font-dongle text-2xl'>si ya tienes una cuenta creada, inicia sesion en <Link to={'/login'} className='hover:underline  text-ligter font-dongle text-2xl'>Login</Link> </div>
       <button className='bg-primary border-2 border-gray-300 hover:text-ligter hover:border-ligter transition-all duration-300 hover:tracking-wide  active:scale-90 mx-auto p-3 py-2 w-[60%] md:w-[40%] rounded-3xl font-rubick text-gray-300  text-lg'>Crear cuenta</button>
   </form>
 )
}

export default Register