import { useMemo } from "react";
import { useResource } from "@/hooks/useResource";
import { isPastDate } from "@/lib/dates";
import { paymentsApi } from "../api/paymentsApi";

// "overdue" is derived from status + due date, never stored.
export const withDisplayStatus = (p) => ({
  ...p,
  displayStatus: p.status === "pending" && isPastDate(p.dueDate) ? "overdue" : p.status,
});

export function summarizePayments(payments) {
  const total = (direction, status) =>
    payments
      .filter((p) => p.direction === direction && p.status === status)
      .reduce((sum, p) => sum + p.amount, 0);

  return {
    collected: total("incoming", "paid"),
    toCollect: total("incoming", "pending"),
    paidOut: total("outgoing", "paid"),
    toPay: total("outgoing", "pending"),
    overdueCount: payments.filter((p) => p.displayStatus === "overdue").length,
  };
}

export function usePayments(eventId) {
  const { items, ...actions } = useResource(paymentsApi, eventId);
  const payments = useMemo(() => items.map(withDisplayStatus), [items]);
  const summary = useMemo(() => summarizePayments(payments), [payments]);
  return { payments, summary, ...actions };
}
