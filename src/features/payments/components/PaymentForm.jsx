import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toOptions } from "@/lib/options";
import { DIRECTION } from "../constants";
import { paymentSchema } from "../schemas";

export function PaymentForm({ defaultValues, onSubmit, onCancel, submitLabel = "Save payment" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(paymentSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Select label="Type" options={toOptions(DIRECTION)} error={errors.direction?.message} {...register("direction")} />
      <Input label="From or to" placeholder="Ngozi Eze, aso-ebi (3 sets)" error={errors.label?.message} {...register("label")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Amount (₦)" type="number" min="0" error={errors.amount?.message} {...register("amount")} />
        <Input label="Due date" type="date" error={errors.dueDate?.message} {...register("dueDate")} />
      </div>
      <Select
        label="Status"
        options={[{ value: "pending", label: "Pending" }, { value: "paid", label: "Paid" }]}
        error={errors.status?.message}
        {...register("status")}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
