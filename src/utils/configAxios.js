import axios from "axios";

const axiosMusic = axios.create({
    baseURL:"https://api-music-backend.onrender.com"
})


axiosMusic.interceptors.request.use((config)=>{
  
  
    config.headers = {...config.headers, Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user'))?.token}`}
    
    
    return config

})


export {
    axiosMusic,
}   