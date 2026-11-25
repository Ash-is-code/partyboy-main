import { useMemo } from "react";

export function summarizeBudget(lines) {
  const estimated = lines.reduce((sum, l) => sum + l.estimated, 0);
  const actual = lines.reduce((sum, l) => sum + l.actual, 0);

  const totals = new Map();
  for (const line of lines) {
    const current = totals.get(line.category) ?? { estimated: 0, actual: 0 };
    totals.set(line.category, {
      estimated: current.estimated + line.estimated,
      actual: current.actual + line.actual,
    });
  }
  const byCategory = [...totals].map(([category, t]) => ({ category, ...t }));

  return {
    estimated,
    actual,
    remaining: estimated - actual,
    usedPercent: estimated > 0 ? Math.round((actual / estimated) * 100) : 0,
    byCategory,
    overBudget: byCategory.filter((c) => c.actual > c.estimated),
  };
}

// Derived state: nothing here is stored, it's recomputed only when lines change.
export function useBudgetSummary(lines) {
  return useMemo(() => summarizeBudget(lines), [lines]);
}
