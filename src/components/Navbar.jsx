import Button from "./button"

const Navbar = () => {
  return (
    <div className=" w-full ">
      <div className="w-11/12 mx-auto">
        <div className=" bg-slate-200 flex justify-between items-center rounded-4xl px-5 py-2 md:mt-3">
          <div className="inline-flex gap-1">
              <img src="Vector.png" alt="logo" /><img src="Meetro.png" alt="logo name" width={50}  />
          </div>
          <div className="hidden md:inline-flex gap-4 text-xs">
            <Button name="Create Event" color="bg-white"/>
            <Button name="Discover Events" color="bg-lime-300"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
