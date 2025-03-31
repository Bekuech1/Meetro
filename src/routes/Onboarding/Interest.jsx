import { useState } from "react";
import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton";

function Interest() {
    const text = <p className="tracking-tight">What are you into?🎭🎶⚽</p>;
    const [selectedButton, setSelectedButton] = useState([])
    const [showOptions, setShowOptions] = useState(false) 
    const buttons = [
        {
            title: "Nightlife & Parties",
            className: `text-[#011F0F] mr-4 ml-2`
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
            className: `text-[#095256] bg-white px-6`,
            onclick: ()=> setShowOptions(true)
        },
        {
            title: "Continue",
            className: `text-[#095256] bg-[#AFFC41] px-6` 
        },
    ]

    function ShowOption(){
        const mybtn =[
            {
                title: "Cancel onboarding",
                className: "bg-white px-2 text-xs",
                onclick: ()=>{setShowOptions(false); setSelectedButton([])}
            },
            {
                title: "Continue onboarding",
                className: "bg-[#AFFC41] px-2 text-xs",
                onclick: ()=>setShowOptions(false)
            }
        ]
        return (
            <div className="  leading-12 w-full absolute top-5 h-screen">
                <div className="flex flex-col justify-center items-center mx-auto sm:w-1/2
                     h-screen backdrop-blur-xs">
                    <div className="bg-[#efefee] shadow-2xl py-6 rounded-2xl w-full">
                        <div>
                            <h2 className="text-[#4A3A74] text-[20px] sm:text-3xl text-center paytone font-[850]">Cancel Onboarding?</h2>
                            <p className="text-[#4A3A74] text-sm sm:text-[16px] text-center satoshi font-semibold">You will lose all your progress</p>
                        </div>
                        <div className="flex gap-3 sm:gap-4 mt-4 justify-center">
                            {
                                mybtn.map((btn, ind)=>(
                                    <OnboardingButton {...btn} key={ind} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function handleSelectedbuttons(title) {
        setSelectedButton((prev)=>(
            prev.includes(title) ? prev.filter(btn=>(btn !== title)) : [...prev, title]
        ))
    }

  return (
    <div className="relative">
      <Layout text={text}>
        <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {buttons.slice(0,12).map((btn, ind) => (
                  <OnboardingButton
                    key={ind}
                    title={btn.title}
                    onclick={() => handleSelectedbuttons(btn.title)}
                    className={`px-0 text-xs font-bold satoshi ${btn.className} ${selectedButton.includes(btn.title) ? "bg-[#011C0E] text-[#AEFC40]" : "bg-white"} `
                }
                  />
                ))}
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-6  mb-10">
            {buttons.slice(12, 14).map((btn, ind)=>(
                <OnboardingButton key={ind + 12} {...btn}/>
            ))}
        </div>
      </Layout>
      <div>
            {showOptions && 
            <>
                <div className="absolute bg-red-500 top-0 left-0 w-full h-100vh"> </div>
                <ShowOption />
            </>
            }
        </div>
    </div>
  )
}

export default Interest
