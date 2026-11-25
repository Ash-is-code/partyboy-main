import { toOptions } from "@/lib/options";
import { BOOKING_STATUS } from "../constants";
import { Select } from "@/components/ui/Select";

export function BookingStatusSelect({ value, onChange }) {
  return (
    <Select
      aria-label="Booking status"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={toOptions(BOOKING_STATUS)}
    />
  );
}
