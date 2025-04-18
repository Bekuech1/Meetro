import React from 'react'

const SiteBtn = ( {name, colorPadding, onclick} ) => {
  return (
        <button 
            className= {` w-fit text-[14px] rounded-[60px] capitalize paytone leading-5 font-[400] ${colorPadding} text-[#095256] cursor-pointer`}
            onClick={onclick}
        >
            {name}
        </button>
  )
}

export default SiteBtn