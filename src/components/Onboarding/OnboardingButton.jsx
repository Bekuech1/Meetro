
function OnboardingButton({ title, onclick, className, type}) {
  return (
            <button className={`paytone py-2 px-6 text-sm tracking-tight font-extrabold rounded-2xl mb-2 ${className}`} 
             onClick={onclick} type={type}>
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
