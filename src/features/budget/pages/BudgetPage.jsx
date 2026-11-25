import { useParams } from "react-router-dom";
import { Plus, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ResourceBoundary } from "@/components/feedback/ResourceBoundary";
import { useFormModal } from "@/hooks/useFormModal";
import { formatNaira } from "@/lib/currency";
import { BudgetLineForm } from "../components/BudgetLineForm";
import { BudgetTable } from "../components/BudgetTable";
import { BudgetVsActualChart } from "../components/BudgetVsActualChart";
import { BUDGET_DEFAULTS } from "../constants";
import { useBudget } from "../hooks/useBudget";

export function BudgetPage() {
  const { eventId } = useParams();
  const { lines, summary, status, error, add, update, remove, reload } = useBudget(eventId);
  const modal = useFormModal();

  const handleSubmit = async (values) => {
    if (modal.isNew) await add(values);
    else await update(modal.item.id, values);
    modal.close();
  };

  const over = summary.overBudget.map((c) => c.category).join(", ");

  return (
    <>
      <PageHeader
        title="Budget"
        description="Plan each line, then log what you actually spend."
        actions={
          <Button onClick={modal.openNew}>
            <Plus size={16} /> Add budget line
          </Button>
        }
      />

      <ResourceBoundary
        status={status}
        error={error}
        onRetry={reload}
        isEmpty={lines.length === 0}
        empty={
          <EmptyState
            icon={PiggyBank}
            title="No budget lines yet"
            description="Start with the big costs: venue, food and drinks, aso-ebi. Add the small ones later."
            action={<Button onClick={modal.openNew}>Add budget line</Button>}
          />
        }
      >
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Planned" value={formatNaira(summary.estimated)} />
            <StatCard label="Spent" value={formatNaira(summary.actual)} hint={`${summary.usedPercent}% of the plan`} />
            <StatCard
              label={summary.remaining < 0 ? "Over budget by" : "Remaining"}
              value={formatNaira(Math.abs(summary.remaining))}
              hint={over ? `Over in: ${over}` : undefined}
              tone={summary.remaining < 0 ? "danger" : "success"}
            />
          </div>
          <BudgetVsActualChart data={summary.byCategory} />
          <BudgetTable lines={lines} onEdit={modal.openEdit} onDelete={(line) => remove(line, line.item)} />
        </div>
      </ResourceBoundary>

      <Modal open={modal.isOpen} onClose={modal.close} title={modal.isNew ? "Add budget line" : "Edit budget line"}>
        <BudgetLineForm defaultValues={modal.item ?? BUDGET_DEFAULTS} onSubmit={handleSubmit} onCancel={modal.close} />
      </Modal>
    </>
  );
}
