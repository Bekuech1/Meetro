import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowCircleLeft2, ArrowRight2, Calendar, Location, Map1,
    SidebarRight, Timer1, Send2, Colorfilter, TickCircle
} from 'iconsax-reactjs';
import TagButton from './Buttons/TagButton';
import Alert from './Alert';
import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';
import TextButton from './Buttons/TextButtons';
import IconButton from './Buttons/IconButton';
import ProgressBar from './ProgressBar';
import ConfirmationButton from './Buttons/ConfirmationButton';

const EventExpandedView = ({ event, onClose, onCycleView }) => {
    const navigate = useNavigate();
    const [textExpanded, setTextExpanded] = useState(false);

    if (!event) return null;

    const cleanPhotoUrl = (photoUrl) => {
        return photoUrl ? photoUrl.replace(/^blob:/, '') : '';
    };

    const handleShare = async () => {
        const eventUrl = `${window.location.origin}/events/${event?.slug}`;
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
            navigator.clipboard.writeText(eventUrl);
            alert("Link copied to clipboard!");
        }
    };

    const BASE_DESCRIPTION_LIMIT = 140;
    const descriptionLimit = Math.round(BASE_DESCRIPTION_LIMIT * 2);

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
        <div className="relative overflow-hidden flex flex-col focus:outline-none shadow-2xl w-screen h-screen bg-white satoshi">

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                
                {/* Left Side: Event Image & Hosts */}
                <div className="w-fit flex flex-col py-8 px-10 bg-white gap-4 flex-shrink-0 overflow-y-auto scrollbar-hide">
                    <div>
                        <TagButton
                            leftImg={<ArrowCircleLeft2 size={16} variant='Bold' />}
                            text='Back' 
                            variant='light-purple'
                            className='bg-transparent border-0'
                            onClick={onClose}
                        />
                    </div>
                    
                    <div className='grid gap-4'>
                        <div className="size-[393px] overflow-hidden rounded-3xl border-4 border-white flex-shrink-0">
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
                    
                    <div className='grid gap-3'>
                        <span className='text-base text-[#B0B5B5] font-medium paytone'>Hosted by</span>

                        <div className="flex flex-col gap-4">
                            {/* Main Host */}
                            {event.host && (
                                <div className="flex gap-1 items-center justify-between">
                                    <div className="flex gap-1 items-center">
                                        <Avatar size='xs' src={event.host?.photo?.url || ''} />
                                        <div className="grid">
                                            <span className="text-base font-medium text-[#001010]">{event.host?.fullName}</span>
                                            <span className="text-xs font-medium text-[#8A9191]">Host</span>
                                        </div>
                                    </div>
                                    <TagButton text="Follow" variant="green" size='sm' />
                                </div>
                            )}

                            {/* Co-hosts */}
                            {event.cohosts && event.cohosts.length > 0 && (
                                event.cohosts.map((cohost, index) => (
                                    <div key={cohost.email || index} className="flex gap-1 items-center justify-between">
                                        <div className="flex gap-1 items-center">
                                            <Avatar size='xs' src={cleanPhotoUrl(cohost?.photo)} />
                                            <div className="grid">
                                                <span className="text-base font-medium text-[#001010]">{cohost.name}</span>
                                                <span className="text-xs font-medium text-[#8A9191]">{cohost.role || 'Co-host'}</span>
                                            </div>
                                        </div>
                                        <TagButton text="Follow" variant="green" size='sm' />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className='grid gap-1'>
                        <span className='text-base text-[#B0B5B5] font-medium paytone'>Attending</span>
                        {goingGuests.length > 0 && (
                            <div className='grid gap-1'>
                                <span className='text-base text-[#B0B5B5] font-medium paytone'>Attending</span>
                                <div className="flex items-center gap-4 pointer-events-none">
                                    <AvatarGroup count={remainingCount} size='md' src={goingPhotos} />
                                    <TagButton leftImg={<TickCircle variant='Bold' />} text="Going" variant="green" size='lg' />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Event Details */}
                <div className="w-full min-w-0 flex flex-col h-full bg-white/80 relative border-l border-[#E5E7E3] rounded-tl-2xl">
                    <section className="sticky top-0 right-0 z-10 flex gap-6 flex-col py-6 px-8 border-b border-[#E5E7E3]">
                        <div className="flex gap-2 justify-between">
                            {event.isPrivate && <TagButton text="Private Event" variant="light-purple" size='lg' className='pointer-events-none' />}
                            <div className='flex gap-4'>
                                <TextButton
                                    rightImg={<Send2 variant='Bulk' />}
                                    text="Share" variant='tertiary'
                                    onClick={handleShare}
                                />
                                <TextButton
                                    onClick={onCycleView}
                                    rightImg={<SidebarRight variant='Bulk' />}
                                    text="View Status"
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

                        <div className="mt-auto flex flex-col justify-end sm:flex-row gap-3 px-8 pb-8 sticky bottom-0 bg-gradient-to-b from-[#e8e8e8]/0 to-[#FFFFFF] z-10 pt-6">
                            <ConfirmationButton variant="going" className="max-w-[300px]" />
                            <ConfirmationButton variant="not-sure" className="max-w-[300px]" onClick={() => console.log("clicked")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventExpandedView;