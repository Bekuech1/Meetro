import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout"
import Form from "../../components/Onboarding/Form"
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import ShowOption from "@/components/Onboarding/ShowOption";

function LoginForm() {
    const [formData, setFormData] = useState(()=>{
        const data = JSON.parse(sessionStorage.getItem("login"))
        if(!data){
            return  { name: '', password: '', email: ''}
        }else{
            return {
                name: data?.name,
                password: data?.password,
                email: data?.email
            }
        }
    })

    const [errorMessages, setErrorMessages] = useState({})
    const [showOptions, setShowOptions] = useState(false) 

    useEffect(()=>{
        const newForm = {...formData}
        sessionStorage.setItem("login", JSON.stringify(newForm))
    }, [formData])

    const navigate = useNavigate()
    const text = <p>Welcome back! <br/> We saved you a spot.</p>

    const button = {
        title: "Let Me In!",
        className: 'w-full bg-[#AFFC41] text-[#095256] px-6 rounded-[60px] h-[36px]',
        onclick: handleSubmit,
        type: "submit"
    }

    const forms = [
        {
            id: "email",
            placeholder: "e.g. newman@gmail.com",
            label: "Drop your email here",
            src: "sms.png",
            type: "email",
            value: formData?.email ?? "",
            handleChange: handleChange,
            error: errorMessages.email
        },
        {
            id: "password",
            placeholder: "Enter your password",
            label: "Create a password",
            src: "lock.png",
            type: "password",
            value: formData?.password ?? "",
            handleChange: handleChange,
            error: errorMessages.password
        }
]

        function handleChange(e){
           const {name, value} = e.target
            setFormData((prev)=>({...prev, [name]: value}))
        }

        function handleSubmit(e) {
            e.preventDefault();
            
            let error = {};
        
            if (!formData?.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
                error.email = "Enter a valid email";
            }
        
            if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)){
                error.password = "Password must exceed 8, include a number, capital and lowercase a special character"
            }
            if(!formData?.password.trim()){
                error.password = "Enter your password"
            }

            setErrorMessages(error);
        
            if (Object.keys(error).length === 0) {
                navigate('/home');
            }
        }
        

  return (
    <div>
      <Layout text={text} width={'w-[255px]  sm:w-[450px]'} handleClick1="/login" handleClick2={()=> setShowOptions(true)}>
        <div className={`sm:w-[312px] w-[343px] mb-9` }>
            <form method="get" onSubmit={handleSubmit}>
                {
                    forms.map((form, index)=>(
                        <Form key={index} {...form} />
                    ))
                }
            </form>
        </div>
                <OnboardingButton {...button}/>
        <div>
            <h3 className="text-xs text-center sm:text-sm mt-6 font-medium">New to Meetro?
                 <span className="text-purple-400 satoshi cursor-pointer" onClick={()=>navigate('/sign')}> Sign up here</span></h3>
        </div>   
      </Layout>
      {showOptions && 
                <ShowOption onclick1={()=>{setShowOptions(false); navigate('/'); setErrorMessages({})}} 
                  onclick2={ ()=>setShowOptions(false)}/>
            }
    </div>
  )
}

export default LoginForm
