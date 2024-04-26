import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosMusic } from "../utils/configAxios";
import { numeroAleatorio } from "../utils/getRandomNum";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { onModePlay, setTrackInPlay } from "../store/slices/playTrack.slice";
import TrackList, { EsqueletonTrack } from "../components/shared/TrackList";
import Account from "../components/layouts/Account";

const colors = {
    1 : "bg-green-500",
    2 : "bg-fuchsia-500",
    3: "bg-purple-500"
} 

const gradients = {
    1 : "linear-gradient(180deg, rgba(34, 197, 94, 0.7) 0%, rgba(253,45,45,0) 78%)",
    2 : "linear-gradient(180deg, rgba(217, 70, 239, 0.7) 0%, rgba(253,45,45,0) 78%)",
    3: "linear-gradient(180deg, rgba(168,85,247,0.7) 0%, rgba(253,45,45,0) 78%)"
}


const TrackInfo = () => {
    const [TrackInfo, setTrackInfo] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch()
    const {trackInPlay,modePlay}  = useSelector((store)=> store.playTrack)
    const [numero, setNumero] = useState(numeroAleatorio())
   const [isLoading, setIsLoading] = useState(false)

    const [TracksRecomendations, setTracksRecomendations] = useState([])
    const [isLoadingTracks, setIsLoadingTracks] = useState(false)
    
    console.log('nuevo render');
    useEffect(() => {
      setIsLoading(true)

        axiosMusic
        .get(`tracks/${id}`)
      .then(({ data }) => {
        setTrackInfo(data)
        setIsLoading(false)
        getTracksOfTrack(data.artists[0].name)
    })
      .catch((err) => console.log(err));
  }, []);

   

  const handleOpenMusic = ()=>{
    dispatch(onModePlay())
     dispatch(setTrackInPlay(TrackInfo))
     //aqui falta poner los datos al estado de reproduccion de musica
} 

  const getTracksOfTrack =(name) =>{
    setIsLoadingTracks(true)

    axiosMusic.post('/tracks/search',{name:`${name}`,limit:"15"})
    .then(({ data }) => {
      setTracksRecomendations(data.tracks.items)
       setIsLoadingTracks(false)
      
    })
     .catch((err) => console.log(err));
  }

  
  const functionOfTracks = (idTrack)=>{
    setIsLoadingTracks(true);

    axiosMusic(`/tracks/${idTrack}`)
      .then(({ data }) => {
        console.log(data);
        setTrackInfo(data);
        setIsLoadingTracks(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
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
              !isLoading &&  (<div onClick={handleOpenMusic}  className={`${(trackInPlay.id === TrackInfo.id && modePlay) ? 'hidden' : ' block'} p-4 rounded-full bg-ligter cursor-pointer hover:scale-110 transition-all duration-200 flex justify-center items-center`}>
               <FaPlay className={` text-2xl `} />
               </div>)
            }
          
          </div>

          <div className="min-h-[500px]">
          <div className='text-2xl font-rubick font-bold text-white pl-5'>Recomendaciones</div>
        <p className='font-rubick text-gray-400 pl-5'>basadas en el autor</p>
        
           
            { TrackInfo.name && <TrackList tracks={TracksRecomendations} isLoading={isLoadingTracks} functionOfTracks={functionOfTracks} btnLike btnBackPack /> }
            {/* aqui van las canciones */}
          </div>

       </section>


      </div>
    </div>

    {
      !isLoading  && <Account />
    }
            </>
  );
};

export default TrackInfo;
