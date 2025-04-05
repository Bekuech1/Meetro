import { useState } from "react"

function Form({id, label, type, src, placeholder, value, handleChange, error}) {

  const [open, setOpen] = useState(false)
       
  return (
    <div className= {`w-full ${error ? "mb-4" : "mb-1"}`}>
        <label htmlFor={id} className="satoshi font-bold align-middle text-[10px]">{label}</label>
        <div className="relative flex items-center">
            <img src={src} alt={`${src}-image`} className="size-6 absolute p-1 left-1.5"/>
            {id === "password" && <img src={open ? 'eyeopen.png' : "eye-slash.png"} onClick={()=>setOpen(!open)} className="absolute right-6"/> }
            <input type={`${open && id === "password" ? "text" : type}`} 
            name={id} id={id} placeholder={placeholder} 
            className="border-2 border-slate-300 rounded-lg pl-10 py-1 w-full bg-white text-sm"
            value={value} onChange={handleChange}/>
        </div>
        <div className="relative">
          {error && <span className="text-red-400 text-xs absolute left-0
           max-w-full">{error}</span>}
        </div>
    </div>
  )
}

export default Form
