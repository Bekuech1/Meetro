import API from "@/lib/axios";

export const eventsApi = {
  getUserEvents: async filter => {
    const eventsResponse = await API.get(`/events/my-events?filter=${filter}`);
    return eventsResponse.data.data;
  },
  getUserEventsCount: async () => {
    const countResponse = await API.get(`/events/event-counts`);
    return countResponse.data.data;
  },
  getEvent: async eventId => {
    const eventResponse = await API.get(`/events/${eventId}`);
    return eventResponse.data.data;
  },
  deleteEvent: async eventId => {
    await API.delete(`/events/${eventId}`);
  },
  getProtectedEvent: async eventId => {
    const eventResponse = await API.get(`/events/${eventId}/protected`);
    return eventResponse.data.data;
  },
  updateEvent: async (eventId, eventData) => {
    const eventResponse = await API.patch(`/events/${eventId}`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return eventResponse.data;
  },
  createEvent: async eventData => {
    const eventResponse = await API.post(`/events`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return eventResponse.data;
  },
  getEventGuests: async (eventId, page = 1, search = "") => {
    const guestsResponse = await API.get(
      `/events/${eventId}/guests?page=${page}&search=${search}`
    );
    return guestsResponse.data;
  },
  confirmAttendance: async (eventId, responseStatus) => {
    const responseData = await API.post(`/events/confirm-attendance`, {
      eventId,
      responseStatus,
    });
    return responseData.data;
  },
};
