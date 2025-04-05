import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import ShowOption from "@/components/Onboarding/ShowOption";

function Interest() {
    const [selectedButton, setSelectedButton] = useState([])
    const [showOptions, setShowOptions] = useState(false) 
    const navigate = useNavigate()

    const text = <p className="tracking-tight">What are you into?🎭🎶⚽</p>;
    const buttons = [
        {
            title: "Nightlife & Parties",
            className: `text-[#011F0F] mr-4 ml-2 `
        },
        {
            title: "Music & Concerts",
            className: `text-[#4A3A74] mr-4`
        },
        {
            title: "Networking & Conferences",
            className: `text-[#077D8A] px-1`
        },
        {
            title: "Festivals & Cultural Events",
            className: `text-[#496A1B] mr-2 `
        },
        {
            title: "Sports & Fitness",
            className: `text-[#5856D6] mx-6`
        },
        {
            title: "Food & Drink Events",
            className: `text-[#9B1C46] `
        },
        {
            title: "Tech & Innovation",
            className: `text-[#001010]  mx-4`
        },
        {
            title: "Community Meetups",
            className: `text-[#0A84FF]  mx-2`
        },
        {
            title: "Art & Exhibitions",
            className: `text-[#CF7E00] mx-4`
        },
        {
            title: "Charity & Fundraisers",
            className: `text-[#8125AF] mr-4`
        },
        {
            title: "Outdoor & Adventure",
            className: `text-[#B25000] mr-4`
        },
        {
            title: "Gaming & Esports",
            className: `text-[#269E44]`
        },
        {
            title: "Skip for Now",
            className: `text-[#095256] bg-white px-6 w-[163.5px] rounded-[60px] sm:w-[148px] h-[36px]`,
            onclick: ()=> setShowOptions(true)
        },
        {
            title: "Continue",
            className: `text-[#095256] bg-[#AFFC41] px-6 w-[163.5px] rounded-[60px] sm:w-[148px] h-[36px]`,
            onclick: ()=> navigate('/home')
        }
    ]


    function handleSelectedbuttons(title) {
        setSelectedButton((prev)=>(
            prev.includes(title) ? prev.filter(btn=>(btn !== title)) : [...prev, title]
        ))
    }

  return (
    <div className="relative">
      <Layout text={text} handleClick1="/calender" width={"sm:w-[450px] w-[335px] tracking-tighter text-nowrap"} handleClick2={()=> setShowOptions(true)}>
        <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {buttons.slice(0,12).map((btn, ind) => (
                  <OnboardingButton
                    key={ind}
                    title={btn.title}
                    onclick={() => handleSelectedbuttons(btn.title)}
                    className={`h-[34px] text-xs  satoshi ${btn.className} font-extrabold rounded-[20px]
                    ${selectedButton.includes(btn.title) ? "bg-[#011C0E] text-[#AEFC40]" : "bg-white"} `
                }
                  />
                ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-8 ">
            {buttons.slice(12, 14).map((btn, ind)=>(
                <OnboardingButton key={ind + 12} {...btn}/>
            ))}
        </div>
      </Layout>
            {showOptions && 
                    <ShowOption onclick1={()=>{setShowOptions(false); setSelectedButton([]); navigate('/')}} 
                        onclick2={()=>setShowOptions(false)}/>

            }
    </div>
  )
}

export default Interest
