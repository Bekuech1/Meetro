import { useNavigate } from 'react-router'
import React from 'react'


function Layout({text, children, handleClick1, handleClick2}) {
  const navigate = useNavigate()

  return (
    <div className='bg relative'>
        <div className='h-screen flex justify-center items-center flex-col '>
            <div className='flex justify-between w-1/2 mb-10'>
                <img className='bg-purple-300 rounded-2xl p-1' src="arrow.png" alt="left arrow" onClick={()=>navigate(handleClick1)}/>
                <img className='bg-purple-300 rounded-2xl p-1' src="cancel.png" alt="cancel"  onClick={()=>navigate(handleClick2)}/>
            </div>
                <h2 className='text-[#4A3A74] paytone text-2xl font-extrabold mb-10 text-center max-w-72'>{text}</h2>
            <div>
              {children}
            </div>
        </div>
    </div>
  )
}

export default Layout
