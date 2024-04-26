import React from "react";
import { useForm } from "react-hook-form";
import { CgSearch } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { searchTracksThunk } from "../../store/slices/tracksHome.slice";

const Search = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    //en data esta el objeto necesario para buscar canciones

    data.limit = 15
  
  
     if (data.name) {
     dispatch(searchTracksThunk(data));
     reset();
     }
  });

  return (
    <form className="flex  gap-4 p-2" onSubmit={onSubmit}>
      <div className="flex  items-center  gap-2 p-2 py-3 border-2 border-transparent   rounded-full bg-tertiary mx-auto mb-6  w-full max-w-[80%] md:max-w-[60%]">
        <CgSearch className="text-2xl text-ligter" />
        <input
          placeholder="¿Que deseas escuchar?"
          type="text"
           autoComplete="off"
          {...register("name")}
          className="  tracking-wider line-clamp-1 font-dongle text-lg md:text-xl  grow bg-transparent outline-none text-white"
        />
        
      </div>
    </form>
  );
};

export default Search;
