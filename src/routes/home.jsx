import React, { useEffect } from "react";
import EmptyHome from "@/components/home/EmptyHome";
import NormalHome from "@/components/home/NormalHome";
import useEventStore from "@/stores/eventStore";

export default function Home() {
  const events = useEventStore((state) => state.events);
  const loading = useEventStore((state) => state.loading);
  const fetchEvents = useEventStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, []); // only once on mount

  if (loading) {
    return <EmptyHome />;
  }

  const hasEvents = Object.keys(events).length > 0;

  return <div>{hasEvents ? <NormalHome /> : <EmptyHome />}</div>;
}
