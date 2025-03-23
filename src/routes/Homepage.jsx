import Hero from "../components/Hompage/Hero"
import JoinToday from "../components/Hompage/JoinToday"
import ComingSoon from "../components/Layout-conponents/ComingSoon"
import Footer from "../components/Layout-conponents/Footer"
import FutureFeatures from "../components/Hompage/FutureFeatures"
import Seamless from "../components/Hompage/Seamless"

function Homepage() {
  return (
    <div>
        <ComingSoon />
        <Hero />
        <Seamless />
        <FutureFeatures />
        <JoinToday />
        <Footer />
    </div>
  )
}

export default Homepage
