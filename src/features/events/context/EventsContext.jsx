import { createContext } from "react";
import { useResource } from "@/hooks/useResource";
import { eventsApi } from "../api/eventsApi";

export const EventsContext = createContext(null);

// Events are needed on the list page, the event layout and the overview,
// so they live in context. Everything else loads per event.
export function EventsProvider({ children }) {
  const resource = useResource(eventsApi);
  return <EventsContext.Provider value={resource}>{children}</EventsContext.Provider>;
}
