import { useNavigate } from "react-router"
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton"
import Form from "../../components/Onboarding/Form"
import Text from "../../components/Onboarding/Text"
import { useState } from "react"


function Signup2() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    })

    const [errorMessages, setErrorMessages] = useState({})

    const navigate = useNavigate()
    const text = "Join the Meetro in seconds!"

    const button = {
        title: "Let's gooo!",
        className: 'w-65 bg-[#AFFC41] ',
        onclick: handleSubmit,
        type: "submit"
    }

    const forms = [
        {
            id: "name",
            placeholder: "fullname",
            type: 'text',
            label: "What's your name?",
            src: "user.png",
            value: formData?.name ?? "",
            handleChange: handleChange,
            error: errorMessages.name
        },
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
            placeholder: "Make it a good one!",
            label: "Create a password",
            src: "lock.png",
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
            
            if (!formData.name?.trim()) {
                error.name = "Name is required";
            }
            
            if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
                error.email = "Enter a valid email";
            }
        
            if(!formData.password?.trim()){
                error.password = "Enter your password"
            }

            setErrorMessages(error);
        
            if (Object.keys(error).length === 0) {
                navigate('/lastPage');
            }
        }
        

  return (
    <div>
      <Layout text={text} handleClick1="/signup" handleClick2="/signUp">
        <div>
            <form method="get" onSubmit={handleSubmit}>
                {
                    forms.map((form, index)=>(
                        <Form key={index} {...form} />
                    ))
                }
            </form>
        </div>
        <OnboardingButton {...button}/>
        <Text />
      </Layout>
    </div>
  )
}

export default Signup2
