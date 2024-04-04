import React from 'react'
import './buttons.css'
import { Link, useNavigate } from 'react-router-dom'
import { PiHouseBold } from "react-icons/pi";
import { BsHouseFill } from "react-icons/bs";



const ListenIcon = () => {
  return (
    <div className="middle">
  <div className="bar bar1"></div>
  <div className="bar bar2"></div>
  <div className="bar bar3"></div>
  
</div>
  )
}

const ButtonToHome = () => {
    const navigate = useNavigate()

  const handleToHome = ()=>{
    navigate('/')
  }


  return (
    <button onClick={handleToHome} className="animated-button absolute top-[20px] right-[20px] py-[4px]  ">
  
    <PiHouseBold  className="arr-2 text-xl" />
    <span className="text">Inicio</span>
    <span className="circle"></span>
    
    <BsHouseFill  className="arr-1 text-xl"/>
  </button>
  )
}

export {ListenIcon,ButtonToHome}