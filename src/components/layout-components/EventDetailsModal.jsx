import React, { useState, useEffect, useRef } from 'react';
import IconButton from './Buttons/IconButton';
import { ArrowCircleLeft2, ArrowRight2, Calendar, CloseCircle, Location, Map1, Maximize1, Note1, Send2, SidebarRight, Timer1, User } from 'iconsax-reactjs';
import TagButton from './Buttons/TagButton';
import TextButton from './Buttons/TextButtons';
import Alert from './Alert';



const EventDetailsModal = ({ isOpen, onClose, event }) => {
    const [expanded, setExpanded] = useState(false);
    const [textExpanded, setTextExpanded] = useState(false);
    const modalRef = useRef(null);

    const BASE_DESCRIPTION_LIMIT = 140;
    const descriptionLimit = expanded
        ? Math.round(BASE_DESCRIPTION_LIMIT * 2)
        : BASE_DESCRIPTION_LIMIT;

    const eventDetails = [
        {
            label: "Time",
            value: event.time,
            icon: <Timer1 variant="Bulk" size={16} />,
        },
        {
            label: "Date",
            value: event.date,
            icon: <Calendar variant="Bulk" size={16} />,
        },
        {
            label: "Dress Code",
            value: event.dressCode,
            icon: <User variant="Bulk" size={16} />,
        },
        {
            label: "Location",
            value: event.location,
            icon: <Location variant="Bulk" size={16} />,
        },
    ];

    // Handle Escape key press and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            // Focus the modal for screen readers when it opens
            modalRef.current?.focus();
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Reset expand state if modal is closed and opened again
    useEffect(() => {
        if (!isOpen) setExpanded(false);
    }, [isOpen]);

    if (!isOpen || !event) return null;

    return (
        // Backdrop
        <div
            className="satoshi fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            {!expanded && (
                <div className='w-[1110px]'>
                    <IconButton
                        onClick={onClose}
                        icon={<CloseCircle color="#DB2863" variant="Bold" size={24} />}
                        className="size-11 border-white bg-[#EDEDED] hover:bg-[#E5E7E3] ml-auto"
                    />
                </div>
            )}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex="-1"
                onClick={(e) => e.stopPropagation()} // Prevent backdrop click from firing
                className={`relative overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out focus:outline-none shadow-2xl ${expanded
                    ? 'w-screen h-screen rounded-none bg-white'
                    : 'w-[1056px] h-[670px] rounded-3xl bg-[#E6E5E5]'
                    }`}
            >
                {/* Left Side: Event Image */}
                <div className={`w-fit flex flex-col py-8 ${expanded ? "px-10 bg-white" : "px-8"} gap-8 flex-shrink-0`}>
                    {expanded && (
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
                        <div className={`${expanded ? "size-[393px]" : "size-[349px]"} overflow-hidden rounded-3xl border-4 border-white`}>
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <Alert
                        title="You have manage access to this event"
                        size='sm'
                        option='outline'
                        onClick={() => console.log("Action triggered!")} // 👈 Add this
                        button={<TagButton variant="light-purple" text='Manage' rightImg={<ArrowRight2 size={12} />} size='sm' className='border-0' />}
                    />
                </div>

                {/* Right Side: Event Details (Scrollable) */}
                <div className={`w-full flex flex-col h-full bg-white relative border-l border-[#E5E7E3] ${expanded && 'rounded-t-2xl'}`}>

                    {/* Action Bar: Sticky top for Expand/Close controls */}
                    <section className={`sticky top-0 right-0 z-10 flex gap-2 ${expanded ? " justify-between" : "flex-col-reverse"} py-6 px-8 border-b border-[#E5E7E3]`}>
                        <h2 id="modal-title" className="text-3xl font-normal paytone text-[#001010]">
                            {event.title}
                        </h2>
                        <div className={`flex gap-2 ${expanded ? "" : "justify-between"}`}>
                            <TextButton
                                onClick={() => { }}
                                rightImg={<Send2 variant='Bulk' />}
                                text="Share"
                                variant='tertiary'
                            />
                            <TextButton
                                onClick={() => setExpanded(!expanded)}
                                rightImg={!expanded ? <Maximize1 variant='Bulk' /> : <SidebarRight variant='Bulk' />}
                                text={expanded ? 'Collapse' : 'Expand'}
                                variant='tertiary'
                            />
                        </div>
                    </section>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar border-b border-[#E5E7E3]">
                        {/* Header Info */}
                        <section className="space-y-3 py-6 px-8 gap-3 border-b border-[#E5E7E3]">
                            {eventDetails.map((item, index) => (
                                <div key={index} className="flex gap-1 items-center justify-between pointer-events-none">
                                    <div className="flex gap-1 items-center">
                                        <IconButton variant="tertiary">
                                            {item.icon}
                                        </IconButton>

                                        <div className="grid">
                                            <span className="text-base font-medium text-[#8A9191]">
                                                {item.label}
                                            </span>
                                            <span className="text-base font-medium text-[#001010]">
                                                {item.value}
                                            </span>
                                        </div>
                                    </div>

                                    {item.label === "Location" && (
                                        <TagButton rightImg={<Map1 />} text="View on Map" variant="light-purple" />
                                    )}
                                </div>
                            ))}

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md text-sm text-gray-500 border border-gray-100">
                                <span className="font-semibold text-gray-700">Coordinates:</span>
                                <span>{event.latitude}° N, {event.longitude}° E</span>
                            </div>
                        </section>

                        {/* Description */}
                        <div className="space-y-2 py-6 px-8">
                            <div className='flex gap-1 items-center'>
                                <Note1 variant='Bulk' size={16} />
                                <h3 className="text-base font-medium text-[#8A9191]">About event</h3>
                            </div>
                            <p
                                className={`text-[#001010] text-base font-medium leading-relaxed ${textExpanded ? "" : "line-clamp-3"
                                    }`}
                            >
                                {event.description}
                            </p>

                            {event.description && event.description.length > descriptionLimit && (
                                <button
                                    onClick={() => setTextExpanded(!textExpanded)}
                                    className="text-sm font-medium text-purple-400 hover:text-purple-600"
                                >
                                    {textExpanded ? "Read less" : "Read more"}
                                </button>
                            )}
                        </div>

                        {/* Bottom Actions */}
                        <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100">
                                Register Now
                            </button>
                            <button className="flex-1 bg-white text-gray-700 font-semibold border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-100">
                                Share Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;