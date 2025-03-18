
const Button = ({name, color})=>{
    return <button className= {`h-8 md:w-40 w-36 text-xs md:text-md rounded-2xl px-6 paytone leading-5 align-middle font-semibold ${color} `}>{name}</button>
}

export default Button