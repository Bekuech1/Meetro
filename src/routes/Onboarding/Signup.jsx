import { useNavigate } from 'react-router'
import { FcGoogle } from "react-icons/fc";
import { IoMail } from "react-icons/io5";
import Layout from "../../components/Onboarding/Layout"
import Text from '../../components/Onboarding/Text';

function Signup() {
    const navigate = useNavigate()
    const text = "Join the Meetro in seconds!"
    const handleClick1 = ()=>navigate("/authentication")
    const handleClick2 = ()=>navigate("/signup")
    const buttons= [
            {
                title: {
                    txt: "Continue with Google",
                    icon: <FcGoogle />
                },
                handle: ()=>navigate("/authentication") ,
                width: "w-65",
                bg: "bg-white"
              },
              {
                title: {
                    txt: "Continue with Email",
                    icon: <IoMail />
                },               
                handle: ()=>navigate("/signup"),
                width: "w-65",
                bg: "bg-[#AFFC41]"
              }
    ]
  return (
    <div>
      <div>
        <Layout text={text} buttons={buttons} dis={"block"} handleClick1={handleClick1} handleClick2={handleClick2}> 
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
