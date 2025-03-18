
const Button = ({name, color})=>{
    return <button className= {` w-fit text-[14px] rounded-[60px] px-6 py-3 paytone leading-5 font-[400] ${color} text-[#095256] cursor-pointer `}>{name}</button>
}

export default Button