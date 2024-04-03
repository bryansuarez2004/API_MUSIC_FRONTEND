import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosMusic } from "../utils/configAxios";
import { numeroAleatorio } from "../utils/getRandomNum";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { onModePlay, setTrackInPlay } from "../store/slices/playTrack.slice";
import TrackListInfo from "../components/TrackInfo/TrackListInfo";
import { EsqueletonTrack } from "../components/shared/TrackList";

const colors = {
    1 : "bg-sky-500",
    2 : "bg-orange-500",
    3: "bg-purple-500"
} 

const gradients = {
    1 : "linear-gradient(180deg, rgba(34,193,195,0.7) 0%, rgba(253,45,45,0) 78%)",
    2 : "linear-gradient(180deg, rgba(249,115,22,0.7) 0%, rgba(253,45,45,0) 78%)",
    3: "linear-gradient(180deg, rgba(168,85,247,0.7) 0%, rgba(253,45,45,0) 78%)"
}


const TrackInfo = () => {
    const [TrackInfo, setTrackInfo] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch()
    const {trackInPlay,modePlay}  = useSelector((store)=> store.playTrack)
    const [numero, setNumero] = useState(numeroAleatorio())
   const [isLoading, setIsLoading] = useState(false)

    
    console.log('nuevo render');
    useEffect(() => {
      setIsLoading(true)

        axiosMusic
        .get(`tracks/${id}`)
      .then(({ data }) => {setTrackInfo(data)
      setIsLoading(false)})
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
        <section className= {`${colors[numero]} pt-[50px] flex flex-col md:flex-row md:items-end items-center gap-5 p-7  min-h-[250px]`}>
          
           
          <img className="aspect-square max-w-[180px] shadow-xl shadow-black" src={TrackInfo.album?.images[1].url} alt="" />
          <div className="grid">
            {  TrackInfo.type &&  <h3 className="font-rubick">Cancion</h3>}
            <h2 className="text-5xl font-rubick font-bold">{TrackInfo.name}</h2>
            <div className='flex text-gray-300 font-rubick '>
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
            {   
              !isLoading &&  (<div className={`${(trackInPlay.id === TrackInfo.id && modePlay) ? 'hidden' : ' block'} p-4 rounded-full bg-ligter flex justify-center items-center`}>
               <FaPlay onClick={handleOpenMusic} className={` text-2xl hover:scale-[1.15] transition-all cursor-pointer  `} />
               </div>)
            }
          
          </div>

          <div className="min-h-[500px]">
          <div className='text-2xl font-rubick font-bold text-white pl-5'>Recomendaciones</div>
        <p className='font-rubick text-gray-400 pl-5'>basadas en el autor</p>
        <div className="rounded-md p-3 max-w-[90%]  md:max-w-[700px] mx-auto grid gap-2 ">
          {
              isLoading && [1,2,3,4,5,6,7,8,9,10].map((num)=>{
                return <EsqueletonTrack key={num} />
              })
            }
        </div>
           
            { TrackInfo.name && <TrackListInfo isLoading={isLoading} setIsLoading={setIsLoading} setTrackInfo={setTrackInfo} nameTrack={TrackInfo} />}
            {/* aqui van las canciones */}
          </div>

       </section>


      </div>
    </div>
  );
};

export default TrackInfo;
