import { useNavigate } from "react-router"
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton"

function Calender() {
    const navigate = useNavigate()
    const text = "Sync Your Calendar (Optional, but Super Handy!)"
    const img = <img src="Social.png" alt="google-mail" className="pl-2" />
    const buttons = [
        {
            title: "Skip for Now",
            className: "bg-white px-6",
            onclick: ()=> navigate('/interest')
        },
        {
            title: {
                txt: "Sync Gmail",
                icon: img
            },
            className: "bg-[#AFFC41] px-6"
        },
    ]
  return (
    <div>
      <div>
          <Layout text={text} handleClick1= '/location' handleClick2= "/location">
          <div className="flex justify-between gap-1.5 sm:gap-4">
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

export default Calender
