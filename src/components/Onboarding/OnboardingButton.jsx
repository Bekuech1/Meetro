
function OnboardingButton({ title, onclick, className}) {
  return (
            <button className={`paytone py-2 px-6 text-sm tracking-tight font-extrabold text-[#095256] rounded-2xl ${className}`} 
             onClick={onclick}>
                {typeof title === "string" ? title
                :
              <span className="flex justify-between text-center items-center">
                {title?.txt}{title?.icon}
              </span>
                }           
           </button>
  )
}

export default OnboardingButton
