import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ResourceBoundary } from "@/components/feedback/ResourceBoundary";
import { useFormModal } from "@/hooks/useFormModal";
import { formatNaira } from "@/lib/currency";
import { cn } from "@/lib/cn";
import { PaymentForm } from "../components/PaymentForm";
import { PaymentTable } from "../components/PaymentTable";
import { DIRECTION, PAYMENT_DEFAULTS } from "../constants";
import { usePayments } from "../hooks/usePayments";

const FILTERS = [{ value: "all", label: "All" }, ...Object.entries(DIRECTION).map(([value, { label }]) => ({ value, label }))];

export function PaymentsPage() {
  const { eventId } = useParams();
  const { payments, summary, status, error, add, update, remove, reload } = usePayments(eventId);
  const modal = useFormModal();
  const [filter, setFilter] = useState("all");

  const visible = payments
    .filter((p) => filter === "all" || p.direction === filter)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const handleSubmit = async (values) => {
    if (modal.isNew) await add(values);
    else await update(modal.item.id, values);
    modal.close();
  };

  const togglePaid = (p) => update(p.id, { status: p.status === "paid" ? "pending" : "paid" });

  return (
    <>
      <PageHeader
        title="Payments"
        description="Aso-ebi money coming in, vendor money going out."
        actions={
          <Button onClick={modal.openNew}>
            <Plus size={16} /> Add payment
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Collected" value={formatNaira(summary.collected)} tone="success" />
        <StatCard
          label="Still to collect"
          value={formatNaira(summary.toCollect)}
          hint={summary.overdueCount > 0 ? `${summary.overdueCount} overdue` : undefined}
          tone={summary.overdueCount > 0 ? "danger" : "default"}
        />
        <StatCard label="Paid to vendors" value={formatNaira(summary.paidOut)} />
        <StatCard label="Still to pay" value={formatNaira(summary.toPay)} />
      </div>

      <div className="mb-4 flex gap-2" role="group" aria-label="Filter payments">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              filter === f.value ? "bg-brand-800 text-white" : "bg-white text-ink/70 hover:bg-brand-100",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ResourceBoundary
        status={status}
        error={error}
        onRetry={reload}
        isEmpty={visible.length === 0}
        empty={
          <EmptyState
            icon={Receipt}
            title="No payments here"
            description="Log aso-ebi payments from guests and deposits to vendors so nothing slips."
            action={<Button onClick={modal.openNew}>Add payment</Button>}
          />
        }
      >
        <PaymentTable
          payments={visible}
          onEdit={modal.openEdit}
          onDelete={(p) => remove(p, p.label)}
          onTogglePaid={togglePaid}
        />
      </ResourceBoundary>

      <Modal open={modal.isOpen} onClose={modal.close} title={modal.isNew ? "Add payment" : "Edit payment"}>
        <PaymentForm defaultValues={modal.item ?? PAYMENT_DEFAULTS} onSubmit={handleSubmit} onCancel={modal.close} />
      </Modal>
    </>
  );
}
