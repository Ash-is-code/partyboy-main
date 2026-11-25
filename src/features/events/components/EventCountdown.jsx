import { daysUntil } from "@/lib/dates";

export function eventCountdownLabel(date) {
  const days = daysUntil(date);
  if (days > 1) return `${days} days to go`;
  if (days === 1) return "Tomorrow";
  if (days === 0) return "Today";
  return `${Math.abs(days)} days ago`;
}

export function EventCountdown({ date, className }) {
  return <span className={className}>{eventCountdownLabel(date)}</span>;
}
