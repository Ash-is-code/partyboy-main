import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/dates";
import { EVENT_TYPE } from "../constants";
import { EventCountdown } from "./EventCountdown";

export function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="group block">
      <Card className="h-full transition-colors group-hover:border-brand-600">
        <div className="mb-3 flex items-center justify-between">
          <Badge tone="brand">{EVENT_TYPE[event.type]?.label}</Badge>
          <EventCountdown date={event.date} className="text-sm font-semibold text-gold-600" />
        </div>
        <h3 className="font-display text-xl font-bold">{event.title}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
          <li className="flex items-center gap-2">
            <CalendarDays size={14} /> {formatDate(event.date)}
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={14} /> {event.venue}
          </li>
          <li className="flex items-center gap-2">
            <Users size={14} /> {event.expectedGuests} guests expected
          </li>
        </ul>
      </Card>
    </Link>
  );
}
