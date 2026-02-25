import GuestIcon from "@/assets/icons/GuestIcon";

function NoGuests({
  title = "No guests yet, let's change that!",
  description = "Invite your friends or share the event link to start filling up this list.",
  children,
}) {
  return (
    <div className="flex flex-col satoshi mx-auto max-w-105 text-center items-center w-full">
      <GuestIcon />
      <h3 className="font-bold text-base sm:text-lg sm:leading-7 text-[#001010] mb-2 mt-4">
        {title}
      </h3>
      <p className="mb-4 text-sm sm:text-base text-[#8A9191] font-medium">
        {description}
      </p>
      {children && children}
    </div>
  );
}

export default NoGuests;
