import { useState } from "react"
import { useNavigate } from "react-router"
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton"
import ShowOption from "@/components/Onboarding/ShowOption";

function Location() {
    const [located, setLocation] = useState("FCT")
    const navigate = useNavigate()
    const text =  <p>Enable Location  <br/> (Totally Up to You!)</p>
    const [showOptions, setShowOptions] = useState(false) 

    const buttons = [
        {
            title: "Skip for Now",
            className: "bg-white text-[#095256] px-6 w-[163.5] sm:w-[148px] h-[36px] rounded-[60px]"
        },
        {
            title: "Continue",
            className: "bg-[#AFFC41] text-[#095256] px-6 w-[163.5] sm:w-[148px] h-[36px] rounded-[60px]",
            onclick: ()=>navigate('/calender')
        },
    ]
  return (
    <div>
      <div>
          <Layout text={text} handleClick1= '/sign' handleClick2={()=> setShowOptions(true)} width={'sm:w-[450px] w-[255px]'}>
          <div >
              <label htmlFor="location" className="satoshi font-bold align-middle text-[10px] pl-0.5 ">Where do you stay?</label>
              <div className="bg-white py-1.5 px-4 rounded-2xl border-slate-600 width relative">
              <img src={'location.png'} alt={`location-image`} className="h-5 absolute  top-1.5"/>

                  <select name="location" id="location" className="block w-68 pl-6 text-sm text-slate-600 satoshi font-medium outline-0"
                  onChange={(e)=>setLocation(e.target.value)} value={located}>
                    <option value="FCT">FCT</option>
                    <option value="dan">DSY</option>
                  </select>
              </div>
          </div>
          <div className="flex justify-between mt-8 gap-4">
              {
                buttons.map((btn, index)=>(
                    <OnboardingButton key={index} {...btn}/>
                ))
              }
          </div>
          </Layout>
          {showOptions && 
                <ShowOption onclick1={()=>{setShowOptions(false); navigate('/')}} 
                  onclick2={ ()=>setShowOptions(false)}/>
            }
      </div>
    </div>
  )
}

export default Location
