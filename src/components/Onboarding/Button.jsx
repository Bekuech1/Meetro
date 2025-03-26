
function Button({buttons= [], dis}) {
  return (
    <div className={ `${dis} ${dis === "flex" ? "gap-5" : ""}`}>
      {buttons.map(({title, handle, width, bg}, index)=>(
        <div key={index} className="flex">
            <button className={`${bg} ${width} paytone py-2 px-6 text-sm tracking-tight font-extrabold text-[#095256] rounded-2xl ${dis === "flex" ? "" : "mb-4"}`} 
             onClick={handle}>
                {typeof title === "string" ? title
                :
              <span className="flex justify-between text-center items-center">
                {title.txt}{title.icon}
              </span>
                }           
           </button>
        </div>
      ))}
    </div>
  )
}

export default Button
