import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatCard } from "@/components/ui/StatCard";
import { useFormModal } from "@/hooks/useFormModal";
import { daysUntil } from "@/lib/dates";
import { formatNaira } from "@/lib/currency";
import { useGuests } from "@/features/guests";
import { useVendors } from "@/features/vendors";
import { usePayments } from "@/features/payments";
import { useBudget } from "@/features/budget";
import { EventForm } from "../components/EventForm";
import { useEvent, useEvents } from "../hooks/useEvents";

export function EventOverviewPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { event } = useEvent(eventId);
  const { update, remove } = useEvents();
  const modal = useFormModal();

  const { summary: guests } = useGuests(eventId);
  const { summary: vendors } = useVendors(eventId);
  const { summary: payments } = usePayments(eventId);
  const { summary: budget } = useBudget(eventId);

  const days = daysUntil(event.date);

  const handleEdit = async (values) => {
    await update(event.id, values);
    modal.close();
  };

  const handleDelete = () => {
    navigate("/");
    remove(event, event.title);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-6 rounded-xl bg-brand-800 p-6 text-white sm:p-8">
        <div>
          <p className="text-sm text-white/70">{days >= 0 ? "Until the day" : "Since the day"}</p>
          <p className="font-display text-6xl font-extrabold leading-none text-gold-400 sm:text-7xl">
            {days === 0 ? "Today" : `${Math.abs(days)} ${Math.abs(days) === 1 ? "day" : "days"}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => modal.openEdit(event)}>
            <Pencil size={14} /> Edit event
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <Trash2 size={14} /> Delete
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Guests confirmed"
          value={`${guests.confirmedHeadcount} / ${event.expectedGuests}`}
          hint={`${guests.pending} invites awaiting a reply`}
        />
        <StatCard
          label="Vendors booked"
          value={`${vendors.committedCount} of ${vendors.total}`}
          hint={`${formatNaira(vendors.committed)} committed`}
        />
        <StatCard
          label="Still to collect"
          value={formatNaira(payments.toCollect)}
          hint={payments.overdueCount > 0 ? `${payments.overdueCount} overdue` : "Nothing overdue"}
          tone={payments.overdueCount > 0 ? "danger" : "default"}
        />
        <StatCard
          label="Budget spent"
          value={`${budget.usedPercent}%`}
          hint={`${formatNaira(budget.actual)} of ${formatNaira(budget.estimated)}`}
          tone={budget.remaining < 0 ? "danger" : "default"}
        />
      </section>

      <Modal open={modal.isOpen} onClose={modal.close} title="Edit event">
        <EventForm defaultValues={modal.item} onSubmit={handleEdit} onCancel={modal.close} />
      </Modal>
    </div>
  );
}
