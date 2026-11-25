import { useMemo } from "react";
import { useResource } from "@/hooks/useResource";
import { guestsApi } from "../api/guestsApi";

export function summarizeGuests(guests) {
  const confirmed = guests.filter((g) => g.rsvp === "yes");
  return {
    invites: guests.length,
    confirmedHeadcount: confirmed.reduce((sum, g) => sum + g.partySize, 0),
    pending: guests.filter((g) => g.rsvp === "pending").length,
    declined: guests.filter((g) => g.rsvp === "no").length,
    asoEbi: guests.filter((g) => g.asoEbi).length,
  };
}

export function useGuests(eventId) {
  const { items, ...actions } = useResource(guestsApi, eventId);
  const summary = useMemo(() => summarizeGuests(items), [items]);
  return { guests: items, summary, ...actions };
}
