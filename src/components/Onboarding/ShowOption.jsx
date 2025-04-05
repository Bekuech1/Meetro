import OnboardingButton from "./OnboardingButton";

function ShowOption({onclick1, onclick2}){
    const mybtn =[
        {
            title: "Cancel onboarding",
            className: "bg-white px-2 text-sm w-[295px] sm:w-[200.5px] rounded-[60px] h-[36px] text-[#095256]",
            onclick: onclick1
        },
        {
            title: "Continue onboarding",
            className: "bg-[#AFFC41] px-2 text-sm w-[295px] sm:w-[200.5px] rounded-[60px] h-[36px] text-[#095256]",
            onclick: onclick2
        }
    ]
    return (
        <div className="leading-12 w-full absolute -translate-y-full">
            <div className="flex flex-col justify-center items-center mx-auto sm:w-1/2
                 h-[90vh] backdrop-blur-xs">
                <div className="bg-[#efefee] shadow-2xl py-6 h-[217px] sm:h-[203px] rounded-3xl w-[343px] sm:w-[546px] mx-4 sm:mx-0">
                    <div>
                        <h2 className="text-[#4A3A74] text-[24px] leading-8 sm:text-3xl text-center paytone ">Cancel Onboarding?</h2>
                        <p className="text-[#4A3A74] text-sm sm:text-[16px] text-center satoshi font-bold">You will lose all your progress</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 m-7 justify-center items-center">
                        { mybtn &&
                            mybtn?.map((btn, ind)=>(
                                <OnboardingButton {...btn} key={ind} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowOption