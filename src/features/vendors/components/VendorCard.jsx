import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { RowActions } from "@/components/ui/RowActions";
import { formatNaira } from "@/lib/currency";
import { BOOKING_STATUS } from "../constants";
import { BookingStatusSelect } from "./BookingStatusSelect";

export function VendorCard({ vendor, onEdit, onDelete, onStatusChange }) {
  const { tone, label } = BOOKING_STATUS[vendor.status];
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="gold">{vendor.category}</Badge>
          <h3 className="mt-2 font-display text-lg font-bold">{vendor.name}</h3>
        </div>
        <Badge tone={tone}>{label}</Badge>
      </div>

      <div>
        <p className="text-xs text-ink/60">Quote</p>
        <p className="font-display text-xl font-bold">{formatNaira(vendor.quote)}</p>
        {vendor.phone && (
          <a href={`tel:${vendor.phone}`} className="mt-1 inline-flex items-center gap-1 text-sm text-brand-700 hover:underline">
            <Phone size={13} /> {vendor.phone}
          </a>
        )}
      </div>

      <div className="mt-auto flex items-center gap-2">
        <div className="flex-1">
          <BookingStatusSelect value={vendor.status} onChange={onStatusChange} />
        </div>
        <RowActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </Card>
  );
}
