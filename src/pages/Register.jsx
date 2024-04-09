import React, { useEffect } from 'react'
import { ButtonToHome } from '../components/Ui/Ux/Buttons'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { axiosMusic, cancelTokenSource } from '../utils/configAxios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Register = () => {
  useEffect(()=>{
    cancelTokenSource.cancel()

  },[])

  return (
    <div className='bg-teal-950 min-h-screen justify-evenly  md:flex-row flex  items-center pt-12'>
    
      
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
        <label className='text-gray-300 font-rubick' htmlFor="">Nombre</label>
        <input className='p-2 rounded-md font-rubick'  {...register('name',{
         required:{
           value:true,
           message:'nombre es requerido'
         }
  

        })} type="text" />
        {errors.name && <span className='text-red-500 text-lg'>{errors.name.message}</span> }
       </div> 



       <div className='flex flex-col'>
        <label className='text-gray-300 font-rubick' htmlFor="">email</label>
        <input className='p-2 rounded-md font-rubick'  {...register('email',{
         required:{
           value:true,
           message:'email es requerido'
         },
         pattern:{
          value:/.*@.*/,
          message:'el email debe ser valido'
         }

        })} type="text" />
        {errors.email && <span className='text-red-500 text-lg'>{errors.email.message}</span> }
       </div>  
       <div className='flex flex-col'>
        <label className='text-gray-300 font-rubick' htmlFor="">contraseña</label>
        <input className='p-2 rounded-md' {...register('password',{
         required:{
           value:true,
           message:'password es requerido'
         },

        })} type="text" />
        {errors.password && <span className='text-red-500 text-lg'>{errors.password.message}</span> }
       </div>  

       <div className=' text-gray-400 font-dongle text-2xl'>si ya tienes una cuenta creada, inicia sesion en <Link to={'/login'} className='hover:underline  text-orange-400 font-dongle text-2xl'>Login</Link> </div>
       <button className='bg-teal-500  mx-auto p-3 py-2 w-[30%] rounded-md '>Crear cuenta</button>
   </form>
 )
}

export default Register