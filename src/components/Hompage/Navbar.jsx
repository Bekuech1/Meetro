import Button from "../Layout-conponents/Button"

const Navbar = () => {
  return (
    <div className="pt-[17px] ">
        <div className="bg-white/10 flex justify-between items-center rounded-4xl px-4 py-3 backdrop-blur-[24px] w-[96.7%] mx-auto">
          <div className="inline-flex gap-1">
              <img src="meetroLogo.svg" alt="" />
          </div>
          <div className="hidden md:inline-flex gap-4">
            <Button name="Create Event" color="bg-white"/>
            <Button name="Discover Events" color="bg-[#AFFC41]"/>
          </div>
          <div className="md:hidden block gap-4 text-xs">
            <img src="mobileMenu.svg" alt="" className=""/>
          </div>
        </div>
    </div>
      
  )
}

export default Navbar
