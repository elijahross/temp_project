import React from 'react'
import load from '../public/loadercircle.svg'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className = "flex w-[100%] h-[100%] relative items-center justify-center bg-transparent">
      <Image src={load} alt='loader' className={`w-[30px] absolute h-auto top-[45vh]`} />
    </div>
  )
}

export default Loading