import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toOptions } from "@/lib/options";
import { BOOKING_STATUS, VENDOR_CATEGORIES } from "../constants";
import { vendorSchema } from "../schemas";

export function VendorForm({ defaultValues, onSubmit, onCancel, submitLabel = "Save vendor" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(vendorSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Vendor name" placeholder="Mama Put Catering" error={errors.name?.message} {...register("name")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Service" options={VENDOR_CATEGORIES} error={errors.category?.message} {...register("category")} />
        <Input label="Quote (₦)" type="number" min="0" error={errors.quote?.message} {...register("quote")} />
      </div>
      <Input label="Phone (optional)" placeholder="08031234567" error={errors.phone?.message} {...register("phone")} />
      <Select label="Booking status" options={toOptions(BOOKING_STATUS)} error={errors.status?.message} {...register("status")} />
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
