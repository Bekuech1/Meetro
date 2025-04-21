import React from 'react'

const SiteBtn = ( {name, colorPadding, onclick} ) => {
  return (
        <button 
            className= {` w-fit sm:text-[14px] text-[10px] rounded-[60px] capitalize paytone sm:leading-5 leading-[14px] font-[400] ${colorPadding} text-[#095256] cursor-pointer`}
            onClick={onclick}
        >
            {name}
        </button>
  )
}

export default SiteBtn