import React, { useEffect, useState } from "react";
import HeaderArtist from "../components/ArtistPage/HeaderArtist";
import { axiosMusic } from "../utils/configAxios";
import { useParams } from "react-router-dom";
import Albums from "../components/ArtistPage/Albums";
import TrackList from "../components/shared/TrackList";

const Artists = () => {
  const [ArtistInCurrentPage, setArtistInCurrentPage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axiosMusic(`/artists/${id}`)
      .then(({ data }) => {
        setArtistInCurrentPage(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const functionOfArtist = (id)=>{
    setIsLoading(true);

    axiosMusic(`/artists/${id}`)
      .then(({ data }) => {
        setArtistInCurrentPage(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-primary md:p-3  md:pl-0  h-screen ">
      <div className="bg-secondary rounded-md h-[100%] w-full overflow-auto">
        <HeaderArtist
          ArtistInCurrentPage={ArtistInCurrentPage}
          isLoading={isLoading}
        />
        <div
          style={{
            background: `linear-gradient(180deg, rgba(216,230,243,0.2) 0%, rgba(253,45,45,0) 60%)`,
          }}
        >
          <Albums ArtistInCurrentPage={ArtistInCurrentPage} />

          {ArtistInCurrentPage.name && (
            <div>
              <div className="font-rubick text-sm pl-5 text-gray-300">
                Canciones populares de
              </div>
              <div className="font-rubick text-2xl font-bold pl-5 text-white">
                {ArtistInCurrentPage.name}
              </div>
            </div>
          )}

          <TrackList
            tracks={ArtistInCurrentPage.songsTop}
            isLoading={isLoading}
            functionOfArtist={functionOfArtist}
          />
        </div>
      </div>
    </div>
  );
};

export default Artists;
