import API from "@/lib/axios";
import useEventStore from "@/stores/eventStore";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteEvent({ eventId }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await API.delete(`/events/${eventId}`); // Replace with your API endpoint
      console.log(response);
      setOpen(false);
      navigate("/home");
      useEventStore.getState().setShouldRefetchEvents(true);
      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-[#F0F0F0] flex items-center justify-center p-1 md:p-2.5 rounded-[60px]"
        onClick={() => setOpen(true)}
      >
        <img
          src="/trash.svg"
          alt="delete-icon"
          className="w-4 h-4 md:w-auto md:h-auto "
        />
      </button>

      {open && (
        <div className="fixed inset-0 w-full h-full flex items-end md:items-center justify-center z-20 bg-[#00000080]">
          <div className="bg-[#FFFFFFD9] flex flex-col gap-16 p-4 md:p-12 rounded-t-3xl md:rounded-3xl w-[656px] backdrop-blur-lg border border-white">
            <div className="flex flex-col gap-4">
              <p className="paytone text-4xl text-center">
                Are you sure you want to delete this event?
              </p>
              <p className="text-center font-medium">
                This action is permanent and cannot be undone. All attendees
                will be notified, and the event will be removed from public
                view.
              </p>
            </div>

            <div className="flex gap-4 paytone">
              <button
                className="bg-white py-3 flex items-center justify-center rounded-[60px] w-full text-[#011F0F]"
                onClick={() => setOpen(false)}
              >
                No, Cancel
              </button>

              <button
                className="flex items-center justify-center py-3 bg-[#DB2863] rounded-[60px] w-full text-white"
                onClick={handleDelete}
              >
                Yes, Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
