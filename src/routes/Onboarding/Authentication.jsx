import { useNavigate } from "react-router";
import Layout from '../../components/Onboarding/Layout'
import OnboardingButton from "../../components/Onboarding/OnboardingButton";

function Authentication() {
  const navigate = useNavigate()
  const text = "Hey there! Ready to explore amazing events around you?"
  
  const buttons = [
    {
      title: "Log In",
      onclick: ()=>navigate("/signup"),
      className: 'w-25 bg-white ',
    },
    {
      title: "Register",
      onclick: ()=>navigate("/signup"),
      className: 'w-27 bg-[#AFFC41] ',
    }
  ]

  

  return (
    <div>
        <Layout text={text}  handleClick1={"/authentication"} handleClick2={"/authentication"}>
          <div className="flex gap-5">
            {buttons.map((btn, index)=>(
             <OnboardingButton {...btn} key={index}/>
            ))}
          </div>
        </Layout> 
    </div>
  )
}

export default Authentication
