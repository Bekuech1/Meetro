
const Button = ({name, color, onClick})=>{
    return <button 
                className= {` w-fit text-[14px] rounded-[60px] capitalize px-6 py-3 paytone leading-5 font-[400] ${color} text-[#095256] cursor-pointer `}
                onClick={onClick}
           >
                {name}
           </button>
}

export default Button