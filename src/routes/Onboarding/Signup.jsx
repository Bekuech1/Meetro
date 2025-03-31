import { FcGoogle } from "react-icons/fc";
import { IoMail } from "react-icons/io5";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout"
import Text from '../../components/Onboarding/Text';
import OnboardingButton from "../../components/Onboarding/OnboardingButton";

function Signup() {
    const navigate = useNavigate();
    const text = "Join the Meetro in seconds!"

    const buttons= [
            {
                title: {
                    txt: "Continue with Google",
                    icon: <FcGoogle />
                },
                onclick: ()=>navigate("/authentication") ,
                className: 'w-65 bg-white text-[#095256] px-6',
              },
              {
                title: {
                    txt: "Continue with Email",
                    icon: <IoMail />
                },               
                onclick: ()=>navigate("/sign"),
                className: 'w-65 bg-[#AFFC41] text-[#095256] px-6',
              }
    ]
  return (
    <div>
      <div>
        <Layout text={text} handleClick1={"/authentication"} handleClick2={"/sign"}> 
        <div className="flex flex-col gap-2 sm:gap-4 mb-3">
          {buttons.map((btn, index)=>(
            <OnboardingButton key={index} {...btn}/>
          ))}
        </div>
        <Text />
        <h6 className='absolute bottom-2 left-0 text-xs sm:text-sm text-center w-full font-normal tracking-wide '>
            <span className='text-[#8A9191] '>By signing up, you agree to our </span> 
            Terms & Conditions <span className='text-[#8A9191] '>and </span>Privacy Policy.
        </h6>
        </Layout>  
      </div>
    </div>
  )
}

export default Signup
