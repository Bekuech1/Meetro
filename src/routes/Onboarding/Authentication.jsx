import React from 'react'
import Layout from '../../components/Onboarding/Layout'
import { useNavigate } from 'react-router'

function Authentication() {
  const navigate = useNavigate()
  const text = "Hey there! Ready to explore amazing events around you?"
  const handleClick1 = ()=>navigate("/authentication")
  const handleClick2 = ()=>navigate("/authentication")
  const buttons = [
    {
      title: "Log In",
      handle: ()=>navigate("/signup"),
      width: "w-25",
      bg: "bg-white"
    },
    {
      title: "Register",
      handle: ()=>navigate("/signup"),
      width: "w-27",
      bg: "bg-[#AFFC41]"
    }
  ]

  

  return (
    <div>
        <Layout text={text} buttons={buttons} dis={"flex"} handleClick1={handleClick1} handleClick2={handleClick2}/>  
    </div>
  )
}

export default Authentication
