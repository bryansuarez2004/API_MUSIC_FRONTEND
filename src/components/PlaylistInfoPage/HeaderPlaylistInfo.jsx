import React from "react";
import { ButtonLink, ButtonTrash } from "../Ui/Ux/Buttons";
import { axiosMusic } from "../../utils/configAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePlaylistThunk } from "../../store/slices/user.slice";
import { toast } from "react-toastify";
import { FiExternalLink } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";

const HeaderPlaylistInfo = ({ playlist, setCurrentPlaylist, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShared = (idPlaylist) => {
    const id = toast.loading("Colocando playlist en modo publica");

    axiosMusic
      .put(`/playlists/${idPlaylist}/changeToShared`)
      .then(({ data }) => {
        toast.update(id, {
          render: `Playlist en modo publica, ahora copia el link y compartelo con tus amigos`,
          type: "success",
          isLoading: false,
          autoClose: 2000,
          pauseOnHover: false,
          closeOnClick: true,
        });
        setCurrentPlaylist((state) => ({ ...state, shared: true }));

        console.log(data);
      })
      .catch((err) => {
        toast.update(id, {
          render: `Ocurrio un error, intente denuevo`,
          type: "error",
          isLoading: false,
          autoClose: 1700,
          pauseOnHover: false,
          closeOnClick: true,
        });

        console.log(err);
      });
  };

  const handleDeletePlaylist = (idPlaylist) => {
    dispatch(deletePlaylistThunk(idPlaylist, navigate));
  };

  const handleGetLink = (idPlaylist) => {

    const currentUrl = window.location.origin
    const urlCopy = `${currentUrl}/sharedPlaylist/${idPlaylist}`


    navigator.clipboard
      .writeText(urlCopy)
      .then(()=>{
        toast.success("Link copiado, compartelo con tus amigos  ", {
          autoClose: 1600,
  closeOnClick: true,
  pauseOnHover: false,
        });
      })
   console.log(urlCopy);
  };


  return (
    <section
      className={`${
        isLoading ? "bg-black/35 " : " bg-emerald-400"
      }   pt-[50px]  inset-0 bg-cover bg-bottom  relative flex flex-col md:flex-row md:items-end items-center gap-5 p-7  min-h-[250px]`}
    >
      {!isLoading && (
        <div className="flex flex-col md:flex-row gap-8 justify-between w-full items-center">
          <div className="flex flex-col gap-2">
            <span className="font-rubick text-white text-xs relative top-3 pl-1">
              {" "}
              playlist
            </span>
            <h2 className="text-6xl font-rubick font-bold text-white">
              {playlist.name}
            </h2>
            <div className="text-sm  p-2 py-1 max-w-max text-white font-rubick font-medium tracking-wider  rounded-full border-2 ">
              {playlist.tracks?.length} canciones
            </div>
          </div>
          <div className="md:self-end flex gap-6 md:items-center">

            <ButtonTrash functionToDelete={handleDeletePlaylist} id={playlist.id} stiles={'scale-[1.8]'} />
            

            {playlist.shared ? (
              <button onClick={() => handleGetLink(playlist.id)} className="p-[7px] py-[8.5px] hover:bg-gray-700 group bg-gray-500 border-2 border-transparent rounded-lg">
                <FaLink className="text-2xl text-white group-hover:scale-[1.15] transition-all duration-300" />
              </button>
            ) : (
              <div className="flex   gap-3 ">
                <button onClick={() => handleShared(playlist.id)} className="p-[7px] py-[8.5px] hover:bg-sky-900 group bg-sky-600 border-2 border-transparent rounded-lg">
                <FiExternalLink className="text-2xl text-white group-hover:scale-[1.15] transition-all duration-300"  />
                </button>
                {/* <ButtonLink text={"compartir"} /> */}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeaderPlaylistInfo;
