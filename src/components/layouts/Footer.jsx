import React from 'react'

const Footer = ({minus=false}) => {
  return (
    <div className={`${minus ? 'pb-[70px] ' : ' pb-[120px]'} w-[85%] mx-auto p-5   md:pb-[50px]`}>
      <hr className='border-gray-600' />
       <div className='font-rubick text-gray-400 text-sm p-5 pl-0'>Creado por: <a href="https://portafolio-livid-sigma.vercel.app/" target='_blank' className='hover:text-white hover:underline'>Bryan Suarez</a></div>
    </div>
  )
}

export default Footer