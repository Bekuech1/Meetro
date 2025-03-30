import { useState } from "react"
import { useNavigate } from "react-router"
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton"

function Location() {
    const [located, setLocation] = useState("FCT")
    const navigate = useNavigate()
    const text = "Enable Location (Totally Up to You!)"
    const buttons = [
        {
            title: "Skip for Now",
            className: "bg-white"
        },
        {
            title: "Continue",
            className: "bg-[#AFFC41]",
            onclick: ()=>navigate('/calender')
        },
    ]
  return (
    <div>
      <div>
          <Layout text={text} handleClick1= '/location' handleClick2= "/location">
          <div className=" mb-5">
              <label htmlFor="location" className="satoshi font-bold align-middle text-[10px] pl-0.5 ">Where do you stay?</label>
              <div className="bg-white py-1.5 px-4 rounded-2xl border-slate-600 width mt-2 relative">
              <img src={'location.png'} alt={`location-image`} className="h-5 absolute  top-1.5"/>

                  <select name="location" id="location" className="block w-68 pl-6 text-sm text-slate-600 satoshi font-medium outline-0"
                  onChange={(e)=>setLocation(e.target.value)} value={located}>
                    <option value="FCT">FCT</option>
                    <option value="dan">DSY</option>
                  </select>
              </div>
          </div>
          <div className="flex justify-between mb-3">
              {
                buttons.map((btn, index)=>(
                    <OnboardingButton key={index} {...btn}/>
                ))
              }
          </div>
          </Layout>
      </div>
    </div>
  )
}

export default Location
