import Layout from "../../components/Onboarding/Layout"
import OnboardingButton from "../../components/Onboarding/OnboardingButton";

function Interest() {
    const text = "What are you into? 🎭🎶⚽";
    const buttons = [
        {
            title: "Nightlife & Parties",
            // onclick: "",
            className: "text-[#011F0F] bg-white text-xs mx-4 "
        },
        {
            title: "Music & Concerts",
            // onclick: "",
            className: "text-[#4A3A74] bg-white text-xs mr-4"
        },
        {
            title: "Networking & Conferences",
            // onclick: "",
            className: "text-[#077D8A] bg-white text-xs"
        },
        {
            title: "Festivals & Cultural Events",
            // onclick: "",
            className: "text-[#496A1B] bg-white text-xs mr-4"
        },
        {
            title: "Sports & Fitness",
            // onclick: "",
            className: "text-[#5856D6] bg-white text-xs mr-4"
        },
        {
            title: "Food & Drink Events",
            // onclick: "",
            className: "text-[#9B1C46] bg-white text-xs"
        },
        {
            title: "Tech & Innovation",
            // onclick: "",
            className: "text-[#001010] bg-white text-xs mx-4"
        },
        {
            title: "Community Meetups",
            // onclick: "",
            className: "text-[#0A84FF] bg-white text-xs mr-4"
        },
        {
            title: "Art & Exhibitions",
            // onclick: "",
            className: "text-[#CF7E00] bg-white text-xs"
        },
        {
            title: "Charity & Fundraisers",
            // onclick: "",
            className: "text-[#8125AF] bg-white text-xs mr-4"
        },
        {
            title: "Outdoor & Adventure",
            // onclick: "",
            className: "text-[#B25000] bg-white text-xs mr-4"
        },
        {
            title: "Gaming & Esports",
            // onclick: "",
            className: "text-[#269E44] bg-white text-xs"
        },
        {
            title: "Skip for Now",
            // onclick: "",
            className: "text-[#095256] bg-white"
        },
        {
            title: "Continue",
            // onclick: "",
            className: "text-[#095256] bg-[#AFFC41] "
        },
    ]
  return (
    <div>
      <Layout text={text}>
        <div>
            <div className="flex flex-col gap-2">
                <div>
                    {
                        buttons.slice(0,3).map((btn, ind)=>(
                            <OnboardingButton key={ind} {...btn}/>
                        ))
                    }
                </div>
                <div>
                    {
                        buttons.slice(3,6).map((btn, ind)=>(
                            <OnboardingButton key={ind + 3} {...btn}/>
                        ))
                    }
                </div>
                <div>
                    {
                        buttons.slice(6,9).map((btn, ind)=>(
                            <OnboardingButton key={ind + 6} {...btn}/>
                        ))
                    }
                </div>
                <div>
                    {
                        buttons.slice(9,12).map((btn, ind)=>(
                            <OnboardingButton key={ind + 9} {...btn}/>
                        ))
                    }
                </div>
            </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
            {buttons.slice(12, 14).map((btn, ind)=>(
                <OnboardingButton key={ind + 12} {...btn}/>
            ))}
        </div>
      </Layout>
    </div>
  )
}

export default Interest
