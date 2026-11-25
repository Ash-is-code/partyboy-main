import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ResourceBoundary } from "@/components/feedback/ResourceBoundary";
import { useDebounce } from "@/hooks/useDebounce";
import { useFormModal } from "@/hooks/useFormModal";
import { GuestFilters } from "../components/GuestFilters";
import { GuestForm } from "../components/GuestForm";
import { GuestTable } from "../components/GuestTable";
import { GUEST_DEFAULTS, RSVP_CYCLE } from "../constants";
import { useGuests } from "../hooks/useGuests";

export function GuestsPage() {
  const { eventId } = useParams();
  const { guests, summary, status, error, add, update, remove, reload } = useGuests(eventId);
  const modal = useFormModal();
  const [filters, setFilters] = useState({ search: "", rsvp: "all", group: "all" });
  const search = useDebounce(filters.search, 250);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return guests.filter(
      (g) =>
        (filters.rsvp === "all" || g.rsvp === filters.rsvp) &&
        (filters.group === "all" || g.group === filters.group) &&
        g.name.toLowerCase().includes(term),
    );
  }, [guests, filters.rsvp, filters.group, search]);

  const handleSubmit = async (values) => {
    if (modal.isNew) await add(values);
    else await update(modal.item.id, values);
    modal.close();
  };

  const cycleRsvp = (guest) => {
    const next = RSVP_CYCLE[(RSVP_CYCLE.indexOf(guest.rsvp) + 1) % RSVP_CYCLE.length];
    update(guest.id, { rsvp: next });
  };

  return (
    <>
      <PageHeader
        title="Guests"
        description="Track who's coming, how many they're bringing and who's wearing aso-ebi."
        actions={
          <Button onClick={modal.openNew}>
            <Plus size={16} /> Add guest
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Badge tone="success">{summary.confirmedHeadcount} people confirmed</Badge>
        <Badge tone="warning">{summary.pending} awaiting reply</Badge>
        <Badge tone="danger">{summary.declined} declined</Badge>
        <Badge tone="gold">{summary.asoEbi} on aso-ebi</Badge>
      </div>

      <ResourceBoundary
        status={status}
        error={error}
        onRetry={reload}
        isEmpty={guests.length === 0}
        empty={
          <EmptyState
            icon={Users}
            title="Your guest list is empty"
            description="Add the first guest, then tap their reply badge as the RSVPs come in."
            action={<Button onClick={modal.openNew}>Add guest</Button>}
          />
        }
      >
        <GuestFilters filters={filters} onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))} />
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink/20 bg-white py-10 text-center text-sm text-ink/60">
            No guests match those filters.
          </p>
        ) : (
          <GuestTable
            guests={visible}
            onEdit={modal.openEdit}
            onDelete={(guest) => remove(guest, guest.name)}
            onCycleRsvp={cycleRsvp}
          />
        )}
      </ResourceBoundary>

      <Modal open={modal.isOpen} onClose={modal.close} title={modal.isNew ? "Add guest" : "Edit guest"}>
        <GuestForm defaultValues={modal.item ?? GUEST_DEFAULTS} onSubmit={handleSubmit} onCancel={modal.close} />
      </Modal>
    </>
  );
}
