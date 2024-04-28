import React, { useEffect } from "react";
import "./buttons.css";
import { Link, useNavigate } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
import { BsHouseFill } from "react-icons/bs";
import { axiosMusic } from "../../../utils/configAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteTrack,
  addTrackToBackPack,
  removeFavoriteTracks,
} from "../../../store/slices/user.slice";
import { ToastContainer, toast } from "react-toastify";
import { removeCurrentTrack } from "../../../store/slices/playTrack.slice";
import { changePage } from "../../../store/slices/page.slice";


const ListenIcon = () => {
  return (
    <div className="middle">
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

const ButtonToHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToHome = () => {
    navigate("/");
    dispatch(removeCurrentTrack());
    dispatch(changePage(1))
  };

  return (
    <button
      onClick={handleToHome}
      className="animated-button absolute top-[20px] right-[20px] py-[4px]  "
    >
      <PiHouseBold className="arr-2 text-xl " />
      <span className="text font-rubick tracking-wider">Inicio</span>
      <span className="circle"></span>

      <BsHouseFill className="arr-1 text-xl " />
    </button>
  );
};

const ButtonLike = ({ isLiked, setIsLiked, track }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.user);

  //necesita un estado que verifica si esta en tru o false
  const handleFavoriteBtn = () => {
    if (token !== "") {
      if (isLiked) {
        //logica para quitar me gusta
        const id = toast.loading("Quitando cancion de favoritos...");

        axiosMusic
          .delete(`/users/removeTracks/${track.id}`)
          .then(({ data }) => {
            console.log(data);
            toast.update(id, {
              render: `cancion quitada de favoritos`,
              type: "success",
              isLoading: false,
              autoClose: 1700,
              pauseOnHover: false,
              closeOnClick: true,
            });
            dispatch(removeFavoriteTracks(data.spotifyId));
            setIsLiked(false);
          })
          .catch((err) => console.log(err));
      } else {
        //logica para dara me gusta

        const id = toast.loading("Agregando cancion de favoritos...");

        axiosMusic
          .post(`/users/addTracks/${track.id}`)
          .then(({ data }) => {
            toast.update(id, {
              render: `cancion agregada a favoritos`,
              type: "success",
              isLoading: false,
              autoClose: 1700,
              pauseOnHover: false,
              closeOnClick: true,
            });
            setIsLiked(true);
            dispatch(addFavoriteTrack(data));
            console.log(data);
          })
          .catch((err) => console.log(err));
      }
    } else {
      toast.warn(
        "Debes hacer login para tener tu propia seccion de favoritos",
        {
          autoClose: 1700,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
    }
  };

  return (
    <div className="heart-container w-[25px]  hover:animate-bounce transition-all duration-500 " title="Agregar a favoritos">
      <input
        onChange={handleFavoriteBtn}
        type="checkbox"
        checked={isLiked}
        className="checkbox"
        id="Give-It-An-Id"
      />
      <div className="svg-container">
        <svg
          viewBox="0 0 24 24"
          className="svg-outline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="svg-filled"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        <svg
          className="svg-celebrate"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="10,10 20,20"></polygon>
          <polygon points="10,50 20,50"></polygon>
          <polygon points="20,80 30,70"></polygon>
          <polygon points="90,10 80,20"></polygon>
          <polygon points="90,50 80,50"></polygon>
          <polygon points="80,80 70,70"></polygon>
        </svg>
      </div>
    </div>
  );
};

const ButtonAddToBackPack = ({ track }) => {
  const dispatch = useDispatch();
  const { backPack, token } = useSelector((store) => store.user);

  const handleAddTrackToBackPack = () => {
    if (token !== "") {
      const isOn = backPack.some((trackInBackPack) => {
        return trackInBackPack.id === track.id;
      });

      if (isOn) {
        toast.warn("Esta Cancion ya se encuentra en tu mochila", {
          autoClose: 1100,
          closeOnClick: true,
          pauseOnHover: false,
        });
      } else {
        dispatch(addTrackToBackPack(track));
      }
    } else {
      toast.warn("Debes hacer login, para agregar canciones", {
        autoClose: 1600,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <button
      title="Agregar"
      className="group cursor-pointer outline-none hover:rotate-90 duration-300 "
      onClick={handleAddTrackToBackPack}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29px"
        height="29px"
        viewBox="0 0 24 24"
        className="stroke-ligter fill-none group-hover:fill-green-800 group-active:stroke-white group-active:fill-ligter/45 group-active:duration-0 duration-300"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          stroke-width="1.5"
        ></path>
        <path d="M8 12H16" stroke-width="1.5"></path>
        <path d="M12 16V8" stroke-width="1.5"></path>
      </svg>
    </button>
  );
};



 const ButtonTrash = ({functionToDelete,id ,stiles}) => {
  return (
    <div onClick={(e)=>functionToDelete(id,e)} className={`bin-button ${stiles}`}>
  <svg
    className="bin-top"
    viewBox="0 0 39 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
    <line
      x1="12"
      y1="1.5"
      x2="26.0357"
      y2="1.5"
      stroke="white"
      stroke-width="3"
    ></line>
  </svg>
  <svg
    className="bin-bottom"
    viewBox="0 0 33 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_8_19" fill="white">
      <path
        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
      ></path>
    </mask>
    <path
      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
      fill="white"
      mask="url(#path-1-inside-1_8_19)"
    ></path>
    <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
    <path d="M21 6V29" stroke="white" stroke-width="4"></path>
    
  </svg>
</div>
  )
}




 const ButtonLink = ({text,functionOnClick}) => {
  return (
    <button className="Btn">
  
  <p className="text">{text}</p>
  <span className="effect"></span>
</button>
  )
}



export { ListenIcon, ButtonToHome, ButtonLike, ButtonAddToBackPack,ButtonTrash,ButtonLink };
