import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toOptions } from "@/lib/options";
import { GUEST_GROUPS, RSVP_STATUS } from "../constants";

export function GuestFilters({ filters, onChange }) {
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_180px_180px]">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
        <Input
          aria-label="Search guests"
          placeholder="Search by name"
          className="pl-9"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>
      <Select
        aria-label="Filter by reply"
        value={filters.rsvp}
        onChange={(e) => onChange({ rsvp: e.target.value })}
        options={[{ value: "all", label: "All replies" }, ...toOptions(RSVP_STATUS)]}
      />
      <Select
        aria-label="Filter by group"
        value={filters.group}
        onChange={(e) => onChange({ group: e.target.value })}
        options={[{ value: "all", label: "All groups" }, ...GUEST_GROUPS]}
      />
    </div>
  );
}
