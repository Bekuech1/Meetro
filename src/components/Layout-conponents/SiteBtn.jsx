import React from 'react'

const SiteBtn = ( {name, colorPadding, onclick} ) => {
  return (
        <button 
            className= {` w-fit sm:text-[14px] text-[10px] rounded-[60px] capitalize paytone sm:leading-5 leading-[14px] font-[400] ${colorPadding} text-[#095256] hover:text-[#AEFC40] hover:bg-[#011F0F] cursor-pointer transition-all duration-300 ease-in-out`}
            onClick={onclick}
        >
            {name}
        </button>
  )
}

export default SiteBtn