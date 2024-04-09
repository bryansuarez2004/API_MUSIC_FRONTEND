import axios from "axios";

const axiosMusic = axios.create({
    baseURL:"https://api-music-backend.onrender.com"
})

const cancelTokenSource = axios.CancelToken.source();

axiosMusic.interceptors.request.use((config)=>{
  
  
    config.headers = {...config.headers, Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user'))?.token}`}
    config.cancelToken = cancelTokenSource.token
    
    
    return config

})


export {
    axiosMusic,
    cancelTokenSource
}   