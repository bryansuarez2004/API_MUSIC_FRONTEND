import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosMusic } from "../utils/configAxios";
import { numeroAleatorio } from "../utils/getRandomNum";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { onModePlay, setTrackInPlay } from "../store/slices/playTrack.slice";

const colors = {
    1 : "bg-sky-500",
    2 : "bg-orange-500",
    3: "bg-purple-500"
} 

const gradients = {
    1 : "linear-gradient(180deg, rgba(34,193,195,0.7) 0%, rgba(253,45,45,0) 86%)",
    2 : "linear-gradient(180deg, rgba(249,115,22,0.7) 0%, rgba(253,45,45,0) 86%)",
    3: "linear-gradient(180deg, rgba(168,85,247,0.7) 0%, rgba(253,45,45,0) 86%)"
}


const TrackInfo = () => {
    const [TrackInfo, setTrackInfo] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch()
    const {trackInPlay,modePlay}  = useSelector((store)=> store.playTrack)
    const [numero, setNumero] = useState(numeroAleatorio())
    
    console.log('nuevo render');
    useEffect(() => {


        axiosMusic
        .get(`tracks/${id}`)
      .then(({ data }) => setTrackInfo(data))
      .catch((err) => console.log(err));
  }, []);

  const handleOpenMusic = ()=>{
    dispatch(onModePlay())
     dispatch(setTrackInPlay(TrackInfo))
     //aqui falta poner los datos al estado de reproduccion de musica
}



  return (
    <div className="bg-primary md:p-3  md:pl-0  h-screen ">
      <div className="bg-secondary rounded-md h-[100%] overflow-auto">
        <section className= {`${colors[numero]} pt-[50px] flex flex-col md:flex-row md:items-end items-center gap-5 p-7 `}>
          <img className="aspect-square max-w-[180px] shadow-xl shadow-black" src={TrackInfo.album?.images[1].url} alt="" />
          <div className="grid">
            <h3 className="font-rubick">Cancion</h3>
            <h2 className="text-5xl font-rubick font-bold">{TrackInfo.name}</h2>
            <div className='flex text-primary '>
                {
                    TrackInfo.artists?.slice(0,3).map((artist,index) => (
                         <Link to={`/artist/${artist.id}`} key={artist.id}  className=' text-sm hover:underline'>
                             {artist.name}
                            {TrackInfo.artists.slice(0,3).length - 1  !== index && <span>,  </span> }
                         </Link>
                         
                    )) 
                }
            </div >
          </div>
        </section>
       <section style={{background:`${gradients[numero]}`}}>
          <div className="p-5 flex   ">
            <div className={`${(trackInPlay.id === TrackInfo.id && modePlay) ? 'hidden' : ' block'} p-4 rounded-full bg-ligter flex justify-center items-center`}>
            <FaPlay onClick={handleOpenMusic} className={` text-2xl hover:scale-[1.15] transition-all cursor-pointer  `} />
            </div>
          
          </div>

          <div>
            {/* aqui van las canciones */}
          </div>

       </section>


      </div>
    </div>
  );
};

export default TrackInfo;
