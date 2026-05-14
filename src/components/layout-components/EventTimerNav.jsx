// src/components/layout-components/EventTimerNav.jsx (or wherever your components live)
import React, { useState, useEffect } from 'react';


// You can export this one too if you want to use it independently elsewhere
export const DigitalTime = ({ time, unit }) => {
    return (
        <div className="digital-font flex justify-center items-center">
            <h6 className="text-white font-normal text-xl">{time}</h6>
            <span className="text-[#55695E] font-normal text-sm capitalize ml-1">
                {unit}
            </span>
        </div>
    );
};

// Export the main nav component as default
const EventTimerNav = ({ targetDate, onClick }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        if (!targetDate) return;

        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft(); // initialize immediately
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const day = String(timeLeft.days).padStart(2, "0");
    const hour = String(timeLeft.hours).padStart(2, "0");
    const minute = String(timeLeft.minutes).padStart(2, "0");
    const second = String(timeLeft.seconds).padStart(2, "0");

    return (
        <nav className="bg-[#011F0F] w-full px-8 py-3 flex items-center gap-4 flex-shrink-0">
            <img src="/Logo.svg" alt="Logo" className="size-6" onClick={onClick} />
            <div className="w-full flex justify-end gap-4 items-center">
                <span className="text-lg font-normal paytone text-[#55695E]">
                    {(targetDate && new Date(targetDate) > new Date()) ? "starts in" : "started"}
                </span>
                <div className="flex size-fit">
                    <DigitalTime time={day} unit="d" />
                    <h6 className="text-white text-xl digital-font mx-1">:</h6>
                    <DigitalTime time={hour} unit="h" />
                    <h6 className="text-white font-normal text-xl digital-font mx-1">:</h6>
                    <DigitalTime time={minute} unit="m" />
                    <h6 className="text-white font-normal text-xl digital-font mx-1">:</h6>
                    <DigitalTime time={second} unit="s" />
                </div>
            </div>
        </nav>
    );
};

export default EventTimerNav;
