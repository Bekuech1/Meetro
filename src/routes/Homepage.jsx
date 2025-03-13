import LandPage from "../components/LandPage"
import Navbar from "../components/navbar"

function Homepage() {
  return (
    <div className="bg-pink-800 pt-3 md:pt-0">
      <div className="hidden md:block bg-white small text-center paytone py-2"> 
        <span className="font-extrabold pr-2">Meetro App</span>
        <button className=" bg-linear-to-tr from-lime-300 to-lime-900 rounded-lg py-0.5 px-3 font-semibold text-white ">Coming Soon</button> 
      </div>
      <Navbar />
      <LandPage />
    </div>
  )
}

export default Homepage
