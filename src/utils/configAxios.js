import axios from "axios";

const axiosMusic = axios.create({
    baseURL:"https://api-music-backend.onrender.com"
})


export {
    axiosMusic
}   