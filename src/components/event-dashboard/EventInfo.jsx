export default function EventInfo({ eventId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [error, setError] = useState(null);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };
  
  const handleConfirmAttendance = async (responseType) => {
    try {
      console.log("Confirming attendance for:", eventId);
      const shareResponse = await API.post(`/shares`, { eventId });
      console.log("Share created:", shareResponse.data);

      const shareId = shareResponse.data?.shareId;
      if (!shareId) throw new Error("shareId not returned");

      await API.post(`/shares/${shareId}/confirm`, { responseType });

      setAttendanceStatus(responseType);
    } catch (err) {
      console.error("Confirm attendance error:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to confirm attendance");
    }
  };

  useEffect(() => {
    if (!eventId) return;

    API.get(`/events/${eventId}`).then((response) => {
      const event = response.data;
      // check if current user is already attending event
      const attendees = event.attendees?.L || [];
      const matchedAttendee = attendees.find(
        (attendee) => attendee.M?.userId.S === user.userId
      );

      if (matchedAttendee) {
        // set status directly based on responseType
        setAttendanceStatus(matchedAttendee.M?.responseType.S || null);
      }

      setEventDetails(event);
    });
  }, [eventId]);

  return (
    <div className="w-full md:w-[950px]">
      <div></div>
    </div>
  );
}
