import React, { useEffect } from 'react'
import { ButtonToHome } from '../components/Ui/Ux/Buttons'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { axiosMusic, cancelTokenSource } from '../utils/configAxios'
import { useDispatch } from 'react-redux'
import { loginUserThunk } from '../store/slices/user.slice'


const Login = () => {

   useEffect(()=>{
     cancelTokenSource.cancel('solicitud cancelada')
 
   },[])


  return (
    <div className='bg-teal-950 min-h-screen justify-evenly  md:flex-row flex  items-center pt-12'>
    
      
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



  const submitLogin = handleSubmit((data)=>{
     console.log(data);
       
     dispatch(loginUserThunk(data))


     
  })

 return (
   <form  onSubmit={submitLogin} className='gap-3  p-2 grow max-w-[90%] md:max-w-[450px] grid '>
       <span className='text-3xl font-bold text-white font-rubick'>INICIA SESION</span>
     
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

       <div className=' text-gray-400 font-dongle text-2xl'>si no tienes una cuenta creada, creala en <Link to={'/register'} className='hover:underline  text-orange-400 font-dongle text-2xl'>register</Link> </div>
       <button className='bg-teal-500  mx-auto p-3 py-2 w-[30%] rounded-md '>Iniciar</button>
   </form>
 )
}
export default Login