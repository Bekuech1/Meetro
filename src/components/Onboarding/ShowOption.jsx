import OnboardingButton from "./OnboardingButton";

function ShowOption({onclick1, onclick2}){
    const mybtn =[
        {
            title: "Cancel onboarding",
            className: "bg-[#FFFFFE] px-2 text-sm w-[295px] sm:w-[200.5px] rounded-[60px] h-[36px] text-[#095256]",
            onclick: onclick1
        },
        {
            title: "Continue onboarding",
            className: "bg-[#AFFC41] px-2 text-sm w-[295px] sm:w-[200.5px] rounded-[60px] h-[36px] text-[#095256]",
            onclick: onclick2
        }
    ]
    return (
        <div className="leading-12 w-full  absolute -translate-y-full">
            <div className="flex flex-col justify-center items-center mx-auto 
                 h-[100vh] bg-[#00000080] ">
                <div className="bg-[#ffffffe3] p-6 sm:p-12 h-[217px] sm:h-[253px] rounded-3xl w-[343px] sm:w-[546px] mx-4 sm:mx-0 relative">
                    <div>
                        <h2 className="text-[#4A3A74] text-[22px] leading-8 sm:text-4xl text-center paytone mb-2 sm:mb-6">Cancel Onboarding?</h2>
                        <p className="text-[#4A3A74] text-sm sm:text-[16px] leading-6 text-center satoshi font-bold">You will lose all your progress</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-12 justify-center items-center">
                        { mybtn &&
                            mybtn?.map((btn, ind)=>(
                                <OnboardingButton {...btn} key={ind} />
                            ))
                        }
                    </div>
                     <img src="Vector.svg" alt="cancel" className="absolute bg-[#fffffe8b] sm:-top-7 -top-12 sm:-right-9 -right-3 block
                      size-10 p-2 rounded-3xl opacity-80" onClick={onclick1}/>
                </div>
            </div>
        </div>
    )
}

export default ShowOption