import React from 'react'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full mt-8'>
        <div className="loader"></div>
        <p className='text-lg text-center px-2 mt-5'>{message}</p>
    </div>
  )
}

export default Spinner