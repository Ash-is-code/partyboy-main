import { useParams } from "react-router-dom";
import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ResourceBoundary } from "@/components/feedback/ResourceBoundary";
import { useFormModal } from "@/hooks/useFormModal";
import { formatNaira } from "@/lib/currency";
import { VendorCard } from "../components/VendorCard";
import { VendorForm } from "../components/VendorForm";
import { VENDOR_DEFAULTS } from "../constants";
import { useVendors } from "../hooks/useVendors";

export function VendorsPage() {
  const { eventId } = useParams();
  const { vendors, summary, status, error, add, update, remove, reload } = useVendors(eventId);
  const modal = useFormModal();

  const handleSubmit = async (values) => {
    if (modal.isNew) await add(values);
    else await update(modal.item.id, values);
    modal.close();
  };

  return (
    <>
      <PageHeader
        title="Vendors"
        description={`${summary.committedCount} of ${summary.total} booked, ${formatNaira(summary.committed)} committed.`}
        actions={
          <Button onClick={modal.openNew}>
            <Plus size={16} /> Add vendor
          </Button>
        }
      />

      <ResourceBoundary
        status={status}
        error={error}
        onRetry={reload}
        isEmpty={vendors.length === 0}
        empty={
          <EmptyState
            icon={Store}
            title="No vendors yet"
            description="Add your caterer, DJ, decorator and photographer, then move each one from enquiry to booked."
            action={<Button onClick={modal.openNew}>Add vendor</Button>}
          />
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onEdit={() => modal.openEdit(vendor)}
              onDelete={() => remove(vendor, vendor.name)}
              onStatusChange={(next) => update(vendor.id, { status: next })}
            />
          ))}
        </div>
      </ResourceBoundary>

      <Modal open={modal.isOpen} onClose={modal.close} title={modal.isNew ? "Add vendor" : "Edit vendor"}>
        <VendorForm defaultValues={modal.item ?? VENDOR_DEFAULTS} onSubmit={handleSubmit} onCancel={modal.close} />
      </Modal>
    </>
  );
}
