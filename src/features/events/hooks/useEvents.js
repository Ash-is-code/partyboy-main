import { useContext } from "react";
import { EventsContext } from "../context/EventsContext";

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used inside <EventsProvider>");
  const { items, ...rest } = ctx;
  return { events: items, ...rest };
}

export function useEvent(eventId) {
  const { events, status } = useEvents();
  return { event: events.find((e) => e.id === eventId), status };
}
