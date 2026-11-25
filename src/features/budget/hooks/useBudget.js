import { useResource } from "@/hooks/useResource";
import { budgetApi } from "../api/budgetApi";
import { useBudgetSummary } from "./useBudgetSummary";

export function useBudget(eventId) {
  const { items, ...actions } = useResource(budgetApi, eventId);
  const summary = useBudgetSummary(items);
  return { lines: items, summary, ...actions };
}
