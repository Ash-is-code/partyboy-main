import { useMemo } from "react";
import { useResource } from "@/hooks/useResource";
import { vendorsApi } from "../api/vendorsApi";

const isCommitted = (v) => v.status === "booked" || v.status === "paid";

export function summarizeVendors(vendors) {
  const active = vendors.filter((v) => v.status !== "cancelled");
  const committed = active.filter(isCommitted);
  return {
    total: active.length,
    committedCount: committed.length,
    committed: committed.reduce((sum, v) => sum + v.quote, 0),
  };
}

export function useVendors(eventId) {
  const { items, ...actions } = useResource(vendorsApi, eventId);
  const summary = useMemo(() => summarizeVendors(items), [items]);
  return { vendors: items, summary, ...actions };
}
