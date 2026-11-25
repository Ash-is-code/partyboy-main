import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BUDGET_CATEGORIES } from "../constants";
import { budgetLineSchema } from "../schemas";

export function BudgetLineForm({ defaultValues, onSubmit, onCancel, submitLabel = "Save line" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(budgetLineSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Select label="Category" options={BUDGET_CATEGORIES} error={errors.category?.message} {...register("category")} />
      <Input label="What it covers" placeholder="Stage and table decor" error={errors.item?.message} {...register("item")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Planned (₦)" type="number" min="0" error={errors.estimated?.message} {...register("estimated")} />
        <Input label="Spent so far (₦)" type="number" min="0" error={errors.actual?.message} {...register("actual")} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
