import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from './Buttons/IconButton';
import {
    ArrowCircleLeft2, ArrowRight2, Calendar, CloseCircle, Location, Map1,
    Maximize1, Send2, SidebarRight, Timer1, User, Calendar1, Money3,
    Colorfilter,
    TickCircle
} from 'iconsax-reactjs';
import TagButton from './Buttons/TagButton';
import TextButton from './Buttons/TextButtons';
import Alert from './Alert';

// Imported components from the EventDetail snippet
import EventStatus from "./EventStatus";
import AttendanceStatus from "./AttendanceStatus";
import AvatarGroup from "./AvatarGroup";
import ConfirmationButton from "./Buttons/ConfirmationButton";
import Avatar from './Avatar';
import ProgressBar from './ProgressBar';



// ==========================================
// 1. HELPER COMPONENTS (Time & Navbar)
// ==========================================
const DigitalTime = ({ time, unit }) => {
    return (
        <div className="digital-font flex justify-center items-center">
            <h6 className="text-white font-normal text-xl">{time}</h6>
            <span className="text-[#55695E] font-normal text-sm capitalize ml-1">
                {unit}
            </span>
        </div>
    );
};

// 👇 The newly extracted Timer Navbar component
const EventTimerNav = ({ targetDate }) => {
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
            <img src="/Logo.svg" alt="Logo" className="size-6" />
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

// ==========================================
// 2. MAIN MODAL COMPONENT
// ==========================================
const EventDetailsModal = ({ isOpen, onClose, event }) => {
    const navigate = useNavigate();

    // 3-way view state (1 = Collapsed, 2 = Expanded Split, 3 = Status View)
    const [viewState, setViewState] = useState(1);
    const [textExpanded, setTextExpanded] = useState(false);
    const modalRef = useRef(null);

    // Handle Escape key press and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            modalRef.current?.focus();
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            
        };
    }, [isOpen, onClose]);

    // Reset state if modal is closed and opened again
    useEffect(() => {
        if (!isOpen) {
            setViewState(1);
        }
    }, [isOpen]);

    const handleShare = async () => {
        const eventUrl = `${window.location.origin}/events/${event?.slug}`; // Adjust URL as needed
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event?.title,
                    text: `Check out this event: ${event?.title}`,
                    url: eventUrl,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback if browser doesn't support native sharing
            navigator.clipboard.writeText(eventUrl);
            alert("Link copied to clipboard!");
        }
    };

    // Cycle through the 3 states
    const cycleViewState = () => {
        setViewState(prev => prev === 3 ? 1 : prev + 1);
    };

    if (!isOpen || !event) return null;

    const BASE_DESCRIPTION_LIMIT = 140;
    const descriptionLimit = viewState === 2
        ? Math.round(BASE_DESCRIPTION_LIMIT * 2)
        : BASE_DESCRIPTION_LIMIT;

    const eventDetails = [
        { label: "Time", value: event.time, icon: <Timer1 variant="Bulk" size={16} /> },
        { label: "Date", value: event.date, icon: <Calendar variant="Bulk" size={16} /> },
        { label: "Dress Code", value: event.dressCode, icon: <Colorfilter variant="Bulk" size={16} /> },
        { label: "Location", value: event.location, icon: <Location variant="Bulk" size={16} /> },
    ];

    const goingGuests = event.going?.filter(guest => guest.status === "going") || [];
    const goingPhotos = goingGuests.map(guest => guest.photo);
    const remainingCount = goingGuests.length > 2 ? goingGuests.length - 2 : 0;

    return (
        <div
            className="satoshi fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            {/* Close button for State 1 */}
            {viewState === 1 && (
                <div className='w-[1110px]'>
                    <IconButton
                        onClick={onClose}
                        icon={<CloseCircle color="#DB2863" variant="Bold" size={24} />}
                        className="size-11 border-white bg-[#EDEDED] hover:bg-[#E5E7E3] ml-auto mb-2"
                    />
                </div>
            )}

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex="-1"
                onClick={(e) => e.stopPropagation()}
                className={`relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out focus:outline-none shadow-2xl ${viewState === 1 ? 'w-[1056px] h-[670px] rounded-3xl bg-[#E6E5E5]' :
                    viewState === 2 ? 'w-screen h-screen rounded-none bg-white' :
                        'w-screen h-screen rounded-none bg-[#F0F0F0]' // State 3 styling
                    }`}
            >
                {/* 👇 The unified Timer Navbar used across ALL states */}
                {viewState !== 1 && <EventTimerNav targetDate={event?.startDate} />}

                {/* ============================================================== */}
                {/* STATES 1 & 2: THE SPLIT VIEW (COLLAPSED / EXPANDED)            */}
                {/* ============================================================== */}
                {viewState !== 3 && (
                    <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                        {/* Left Side: Event Image */}
                        <div className={`w-fit flex flex-col py-8 ${viewState === 2 ? "px-10 bg-white" : "px-8"} gap-4 flex-shrink-0 overflow-y-auto scrollbar-hide`}>
                            {viewState === 2 && (
                                <div className=''>
                                    <TagButton
                                        leftImg={<ArrowCircleLeft2 size={16} variant='Bold' />}
                                        text='Back' variant='light-purple'
                                        className='bg-transparent border-0'
                                        onClick={onClose}
                                    />
                                </div>
                            )}
                            <div className='grid gap-4'>
                                <div className={`${viewState === 2 ? "size-[393px]" : "size-[349px]"} overflow-hidden rounded-3xl border-4 border-white flex-shrink-0`}>
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            {event.userRole === "host" && (
                                <Alert
                                    title="You have manage access to this event"
                                    size='sm'
                                    option='outline'
                                    onClick={() => navigate(`/manage-event/${event?.slug}`)}
                                    button={<TagButton variant="purple" text='Manage' rightImg={<ArrowRight2 size={12} />} size='sm' />}
                                />
                            )}
                            <div className='grid gap-1'>
                                <span className='text-base text-[#B0B5B5] font-medium paytone'>Hosted by</span>
                                <div className="flex gap-1 items-center justify-between">
                                    <div className="flex gap-1 items-center">
                                        <Avatar size='xs' src={event.host?.photo?.url ? event.host.photo.url : ''} />
                                        <div className="grid">
                                            <span className="text-base font-medium text-[#001010]">{event.host?.fullName}</span>
                                            <span className="text-xs font-medium text-[#8A9191]">Host</span>
                                        </div>
                                    </div>
                                    <TagButton text="Follow" variant="green" size='sm' />
                                </div>
                            </div>
                            <div className='grid gap-1'>
                                <span className='text-base text-[#B0B5B5] font-medium paytone'>Attending</span>
                                <div className="flex items-center gap-4 pointer-events-none">
                                    <AvatarGroup count={remainingCount} size='md' src={goingPhotos} />
                                    <TagButton leftImg={<TickCircle variant='Bold' />} text="Going" variant="green" size='lg' />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Event Details */}
                        <div className={`w-full min-w-0 flex flex-col h-full bg-white/80 relative border-l border-[#E5E7E3]  ${viewState === 2 && 'rounded-tl-2xl'}`}>
                            <section className={`sticky top-0 right-0 z-10 flex gap-6 flex-col py-6 px-8 border-b border-[#E5E7E3]`}>
                                <div className={`flex gap-2 justify-between`}>
                                    {event.isPrivate && <TagButton text="Private Event" variant="light-purple" size='lg' className='pointer-events-none' />}
                                    <div className='flex gap-4'>
                                        <TextButton
                                            rightImg={<Send2 variant='Bulk' />}
                                            text="Share" variant='tertiary'
                                            onClick={handleShare}
                                        />
                                        <TextButton
                                            onClick={cycleViewState}
                                            rightImg={viewState === 1 ? <Maximize1 variant='Bulk' /> : <SidebarRight variant='Bulk' />}
                                            text={viewState === 1 ? 'Expand' : 'View Status'}
                                            variant='tertiary'
                                        />
                                    </div>
                                </div>
                                <h2 id="modal-title" className="text-3xl font-normal paytone text-[#001010]">
                                    {event.title}
                                </h2>
                            </section>

                            <div className="overflow-y-auto flex flex-col scrollbar-hide border-b border-[#E5E7E3]">
                                <section className="space-y-3 py-6 px-8 gap-3 border-b border-[#E5E7E3]">
                                    {eventDetails.map((item, index) => (
                                        <div key={index} className="flex gap-1 items-center justify-between">
                                            <div className="flex gap-1 items-center">
                                                <IconButton variant="tertiary">{item.icon}</IconButton>
                                                <div className="grid">
                                                    <span className="text-base font-medium text-[#8A9191]">{item.label}</span>
                                                    <span className="text-base font-medium text-[#001010]">{item.value}</span>
                                                </div>
                                            </div>
                                            {item.label === "Location" && (
                                                <TagButton rightImg={<Map1 />} text="View on Map" variant="light-purple" onClick={() => window.open(`https://www.google.com/maps?q=${event.latitude},${event.longitude}`, '_blank')} />
                                            )}
                                        </div>
                                    ))}
                                    {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md text-sm text-gray-500 border border-gray-100 mt-2">
                                        <span className="font-semibold text-gray-700">Coordinates:</span>
                                        <span>{event.latitude}° N, {event.longitude}° E</span>
                                    </div> */}
                                </section>

                                <div className="space-y-2 py-6 px-8">
                                    <h3 className="text-base font-medium text-[#8A9191] paytone">About event</h3>
                                    <p className={`text-[#001010] text-base font-medium leading-relaxed ${textExpanded ? "" : "line-clamp-3"}`}>
                                        {event.description}
                                    </p>
                                    {event.description && event.description.length > descriptionLimit && (
                                        <button onClick={() => setTextExpanded(!textExpanded)} className="text-sm font-medium text-purple-400 hover:text-purple-600">
                                            {textExpanded ? "Read less" : "Read more"}
                                        </button>
                                    )}
                                </div>

                                {event.chipInDetails && (
                                    <div className="space-y-2 py-6 px-8">
                                        <h3 className="text-base font-medium text-[#8A9191] paytone">Tickets</h3>
                                        {event.chipInDetails.chipInType === "target" && (
                                            <ProgressBar current={event.totalDonations} target={event.chipInDetails?.amount} />
                                        )}
                                        {event.chipInDetails.chipInType === "donation" && (
                                            <ProgressBar variant="minimum-amount" amount={event.chipInDetails?.amount} />
                                        )}
                                        {event.chipInDetails.chipInType === "fixed" && (
                                            <ProgressBar variant='amount' amount={event.chipInDetails?.amount} />
                                        )}
                                    </div>
                                )}

                                <div className="space-y-4 py-6 px-8 flex flex-col">
                                    <h3 className="text-base font-medium text-[#8A9191] paytone">Location</h3>
                                    <div className="grid gap-1">
                                        <span className="text-[#001010] text-base font-medium">{event.building}</span>
                                        <span className="text-[#8A9191] text-base font-medium">{event.location}</span>
                                        <span className="text-[#8A9191] text-sm font-medium">{event.furtherDirections}</span>
                                    </div>
                                    {(event.latitude !== 0 || event.longitude !== 0) && (
                                        <div className="w-full h-[350px] rounded-2xl overflow-hidden mt-4 border border-[#E5E7E3]">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                                allowFullScreen
                                                referrerPolicy="no-referrer-when-downgrade"
                                                src={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}&z=15&output=embed`}
                                            ></iframe>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 py-6 px-8">
                                    <h3 className="text-base font-medium text-[#8A9191] paytone">Going</h3>
                                    <div className="flex overflow-x-auto scrollbar-hide gap-4">
                                        <div className="flex overflow-x-auto scrollbar-hide gap-4 p-4">
                                            {event.going.map((guest, index) => (
                                                <div key={index} className='flex flex-col items-center justify-center gap-1 w-[112px] shrink-0 h-[90px] p-3 rounded-[12px] bg-[#FFFFFF] drop-shadow-[0px_4px_16px_rgba(0,0,0,0.04)]'>
                                                    <Avatar size='lg' src={guest.photo} />
                                                    <span className="text-[#001010] text-[10px] font-medium text-center truncate w-full block">
                                                        {guest.name ? guest.name.split(' ')[0] : "Guest"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={`mt-auto flex flex-col justify-end sm:flex-row gap-3 px-8 pb-8 sticky bottom-0 bg-gradient-to-b from-[#e8e8e8]/0 to-[#FFFFFF] z-10 pt-6`}>
                                    <ConfirmationButton variant="going" className={`${viewState === 1 ? 'max-w-[222px]' : 'max-w-[300px]'}`} />
                                    <ConfirmationButton variant="not-sure" className={`${viewState === 1 ? 'max-w-[222px]' : 'max-w-[300px]'}`} onClick={() => console.log("clicked")} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* STATE 3: THE EVENT DETAIL STATUS UI                            */}
                {/* ============================================================== */}
                {viewState === 3 && (
                    <div className="w-full flex-1 overflow-y-auto flex flex-col">
                        <main className="flex flex-col place-items-center flex-1">
                            <section className="w-[513px] h-fit py-6 flex justify-between">
                                <TagButton text="Back" leftImg={<ArrowCircleLeft2 size={16} variant='Bold' />} variant="white" size="lg" onClick={onClose} />
                                <div className="flex gap-4">
                                    <TagButton text="share" rightImg={<Send2 color="black" variant="Bold" />} variant="white" size="lg" onClick={handleShare} />
                                    {/* 👇 Cycle State Toggle to reset to Collapsed (State 1) */}
                                    <TagButton text="Collapse" rightImg={<Maximize1 color="black" variant="Bold" />} variant="white" size="lg" onClick={cycleViewState} />
                                </div>
                            </section>

                            <section className="w-[513px] h-fit flex flex-col gap-6 place-items-center">
                                <div className="grid gap-4 place-items-center">
                                    <div className="grid text-center place-items-center">
                                        <EventStatus title="draft" size="sm" color="bluegreen" />
                                        <h1 className="paytone text-2xl font-normal">{event.title}</h1>
                                    </div>
                                    <EventStatus title="draft" size="sm" color="bluegreen" />
                                </div>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="size-[381px] rounded-3xl aspect-square object-cover"
                                />
                                <div className="grid gap-2 place-items-center">
                                    <div className="size-fit flex gap-2 items-center">
                                        <IconButton icon={<Calendar1 variant="Bold" color="#866AD2" />} variant="tertiary" />
                                        <h6 className="text-base font-medium text-black">
                                            {event.date} <span className="text-[#8A9191] ml-2">{event.time}</span>
                                        </h6>
                                    </div>
                                    <div className="size-fit flex gap-2 items-center">
                                        <TagButton size="md" text={event.location} variant="light-purple" leftImg={<Location color="#7A60BF" variant="Bold" />} />
                                        <TagButton text={`From - ₦${event.chipInDetails?.amount}`} variant="light-purple" leftImg={<Money3 color="#7A60BF" variant="Bold" />} />
                                        <AvatarGroup
                                            size="sm"
                                            count={remainingCount}
                                            src={goingPhotos}
                                        />
                                        {event.userResponse === "going" && (
                                            <AttendanceStatus status="going" />
                                        )}
                                        {event.userResponse === "not-sure" && (
                                            <AttendanceStatus status="not-sure" />
                                        )}
                                        {event.userResponse === "not-going" && (
                                            <AttendanceStatus status="not-going" />
                                        )}
                                    </div>
                                </div>
                                {event.userRole === "host" && (
                                    <Alert
                                        title="You have manage access to this event"
                                        size='sm'
                                        option='outline'
                                        onClick={() => console.log("Action triggered!")}
                                        button={<TagButton variant="purple" text='Manage' rightImg={<ArrowRight2 size={12} />} size='sm' className='border-0' />}
                                    />
                                )}
                            </section>

                            <section className="w-full flex justify-center p-4 mt-auto bg-gradient-to-b from-[#E8E8E8]/0 to-[#E8E8E8]">
                                <div className="w-[513px] flex gap-2">
                                    <ConfirmationButton variant="going" />
                                    <ConfirmationButton variant="not-sure" onClick={() => console.log("clicked")} />
                                </div>
                            </section>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailsModal;