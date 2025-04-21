import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton"
import Form from "../../components/Onboarding/Form"
import Text from "../../components/Onboarding/Text"
import ShowOption from "@/components/Onboarding/ShowOption";


function Signup2() {
    const [formData, setFormData] = useState(()=>{
        const data = JSON.parse(sessionStorage.getItem("signup"))
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

    const navigate = useNavigate()

    useEffect(()=>{
        const newForm = {...formData}
        sessionStorage.setItem("signup", JSON.stringify(newForm))
    }, [formData])

    const text = "Join the Meetro in seconds!"

    const button = {
        title: "Let's gooo!",
        className: 'w-full bg-[#AFFC41] text-[#095256] px-6 rounded-[60px] h-[36px]',
        onclick: handleSubmit,
        type: "submit"
    }

    const forms = [
        {
            id: "name",
            placeholder: "Full Name",
            type: 'text',
            label: "What's your name?",
            src: "user.svg",
            value: formData?.name ?? "",
            handleChange: handleChange,
            error: errorMessages.name
        },
        {
            id: "email",
            placeholder: "e.g. newman@gmail.com",
            label: "Drop your email here",
            src: "sms.svg",
            type: "email",
            value: formData?.email ?? "",
            handleChange: handleChange,
            error: errorMessages.email
        },
        {
            id: "password",
            placeholder: "Make it a good one!",
            label: "Create a password",
            src: "lock.svg",
            type: "password",
            value: formData?.password ?? "",
            handleChange: handleChange,
            error: errorMessages.password
        },

]

        function handleChange(e){
           const {name, value} = e.target
            setFormData((prev)=>({...prev, [name]: value}))
        }

        function handleSubmit(e) {
            e.preventDefault();
            
            let error = {};
            if(!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.name) ){
                error.name = "Enter a valid name";
            }
            
            if (!formData?.name.trim()) {
                error.name = "Name is required";
            }

            
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
                navigate('/calender');
            }
        }
        

  return (
    <div>
      <Layout text={text} width={'w-[255px]  sm:w-[450px]'} handleClick1="/signup" handleClick2={()=> setShowOptions(true)}>
        <div className="sm:w-[312px] w-[343px] mb-12">
            <form method="get" onSubmit={handleSubmit}>
                {
                    forms.map((form, index)=>(
                        <Form key={index} {...form} />
                    ))
                }
            </form>
        </div>
        <OnboardingButton {...button}/>
        <Text path={'/signin'}/>
      </Layout>
      {showOptions && 
                <ShowOption onclick1={()=>{setShowOptions(false); navigate('/'); setErrorMessages({})}} 
                  onclick2={ ()=>setShowOptions(false)}/>
            }
    </div>
  )
}

export default Signup2
