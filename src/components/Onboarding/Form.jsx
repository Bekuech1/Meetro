

function Form({id, label, type, src, placeholder, value, handleChange, error}) {
       
  return (
    <div className="mb-4 w-full">
        <label htmlFor={id} className="satoshi font-bold align-middle text-[11px]">{label}</label>
        <div className="relative flex gap-4 items-center mt-1">
            <img src={src} alt={`${src}-image`} className="h-5 absolute px-2"/>
            {id === "password" && <img src="eye-slash.png" className="absolute right-6"/> }
            <input type={type} name={id} id={id} placeholder={placeholder} 
            className="border-2 border-slate-300 rounded-lg pl-10 py-1 w-full bg-white"
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
