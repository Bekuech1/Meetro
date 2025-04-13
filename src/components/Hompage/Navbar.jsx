import Button from "../Layout-conponents/Button"

const Navbar = ( { visibility, absolute, typeS, onClick } ) => {
  return (
    <div className={`h-fit z-20 ${visibility} ${absolute}`}>
        <div className={`flex justify-between items-center rounded-4xl px-4 py-3 backdrop-blur-[24px] w-[95vw] mx-auto ${typeS}`}>
          <div className="inline-flex gap-1">
              <img src="meetroLogo.svg" alt="" />
          </div>
          <div className="hidden md:inline-flex gap-4">
            <Button name="join community" color="bg-white"/>
            <Button name="join waitlist" color="bg-[#AFFC41]" onClick={onClick}/>
          </div>
          <div className="md:hidden block gap-4 text-xs">
            <img src="mobileMenu.svg" alt="" className=""/>
          </div>
        </div>
    </div>
      
  )
}

export default Navbar
