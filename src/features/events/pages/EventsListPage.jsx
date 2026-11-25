import { PartyPopper, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ResourceBoundary } from "@/components/feedback/ResourceBoundary";
import { useFormModal } from "@/hooks/useFormModal";
import { EventCard } from "../components/EventCard";
import { EventForm } from "../components/EventForm";
import { EVENT_DEFAULTS } from "../constants";
import { useEvents } from "../hooks/useEvents";

export function EventsListPage() {
  const { events, status, error, add, reload } = useEvents();
  const modal = useFormModal();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  const handleCreate = async (values) => {
    await add(values);
    modal.close();
  };

  return (
    <>
      <PageHeader
        title="Your events"
        description="Pick an event to manage its guests, vendors and money."
        actions={
          <Button onClick={modal.openNew}>
            <Plus size={16} /> New event
          </Button>
        }
      />

      <ResourceBoundary
        status={status}
        error={error}
        onRetry={reload}
        isEmpty={events.length === 0}
        empty={
          <EmptyState
            icon={PartyPopper}
            title="No events yet"
            description="Create your first event, then add guests, book vendors and track every naira."
            action={<Button onClick={modal.openNew}>Create event</Button>}
          />
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </ResourceBoundary>

      <Modal open={modal.isOpen} onClose={modal.close} title="New event">
        <EventForm defaultValues={EVENT_DEFAULTS} onSubmit={handleCreate} onCancel={modal.close} submitLabel="Create event" />
      </Modal>
    </>
  );
}
