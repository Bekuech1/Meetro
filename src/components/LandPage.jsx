import Button from "./button"

const LandPage = () => {
  return (
    <div className="h-96 flex flex-col justify-center items-center px-2">
      <div className="md:hidden block bg-transparent small text-center paytone py-2"> 
        <span className="font-extrabold pr-2">Meetro App</span>
        <button className=" bg-linear-to-tr from-lime-300 to-lime-900 rounded-lg py-0.5 px-3 font-semibold text-white ">Coming Soon</button> 
      </div>
      <div>
        <p className="text-3xl font-extrabold text-white text-center max-w-72 md:max-w-80 leading-9 md:leading-14">Never Miss an <span className="text-lime-300 paytone">Event</span> Around You Again</p>
      </div>
       <div className="hidden md:inline-flex gap-4 pt-5 text-sm">
            <Button name="Create Event" color="bg-white"/>
            <Button name="Discover Events" color="bg-lime-300"/>
        </div>
       <div className="md:hidden inline-flex gap-4 pt-5 text-sm">
            <Button name="Join Community" color="bg-white"/>
            <Button name="Discover" color="bg-lime-300"/>
        </div>
    </div>
  )
}

export default LandPage
