import { FcGoogle } from "react-icons/fc";
import { IoMail } from "react-icons/io5";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout"
import Text from '../../components/Onboarding/Text';
import OnboardingButton from "../../components/Onboarding/OnboardingButton";

function Signup() {
    const navigate = useNavigate()
    const text = "Join the Meetro in seconds!"

    const buttons= [
            {
                title: {
                    txt: "Continue with Google",
                    icon: <FcGoogle />
                },
                onclick: ()=>navigate("/authentication") ,
                className: 'w-65 bg-white ',
              },
              {
                title: {
                    txt: "Continue with Email",
                    icon: <IoMail />
                },               
                onclick: ()=>navigate("/signup"),
                className: 'w-65 bg-[#AFFC41] ',
              }
    ]
  return (
    <div>
      <div>
        <Layout text={text} handleClick1={"/authentication"} handleClick2={"/signup"}> 
        <div className="flex flex-col gap-4 mb-3">
          {buttons.map((btn, index)=>(
            <OnboardingButton key={index} {...btn}/>
          ))}
        </div>
        <Text />
        <h6 className='absolute bottom-2 text-md -translate-x-40 tracking-wide '>
            <span className='text-purple-300 '>By signing up, you agree to our </span> 
            Terms & Conditions and Privacy Policy.
        </h6>
        </Layout>  
      </div>
    </div>
  )
}

export default Signup
