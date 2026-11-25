import { Badge } from "@/components/ui/Badge";
import { RSVP_STATUS } from "../constants";

export function RsvpBadge({ status, onClick }) {
  const { label, tone } = RSVP_STATUS[status];
  return (
    <button type="button" onClick={onClick} title="Click to change" className="rounded-full">
      <Badge tone={tone}>{label}</Badge>
    </button>
  );
}
