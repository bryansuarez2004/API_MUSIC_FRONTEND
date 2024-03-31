import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './audioTrack.css'
import { useDispatch, useSelector } from 'react-redux';
import { setListenOff, setListenOn } from '../../store/slices/playTrack.slice';

const AudioTrack = ({trackInPlay}) => {

  const dispatch = useDispatch()

  const handleListenOn = ()=>{
    dispatch(setListenOn())
  }
  const handleListenOff = ()=>{
    dispatch(setListenOff())
  }


  if (trackInPlay.preview_url) {

    return (
      <div className=' bg-orange-300 '>
  
  
    <AudioPlayer
      autoPlay
      src={trackInPlay.preview_url}
      onPlay={ handleListenOn}
      onPause={handleListenOff}
      onEnded={handleListenOff}
      volume={.9}
      showJumpControls={false }
      // other props here
    />
  
      </div>
    )
  } else {
    return (
      <>
      <iframe  className='rounded-md ' src={`https://open.spotify.com/embed/track/${trackInPlay.id}?utm_source=generator&theme=0`} width="100%" height="152"   allow=" autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
      </iframe>
      
    </>
    )
  }
}

export default AudioTrack