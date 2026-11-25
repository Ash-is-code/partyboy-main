import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toOptions } from "@/lib/options";
import { GUEST_GROUPS, RSVP_STATUS } from "../constants";
import { guestSchema } from "../schemas";

export function GuestForm({ defaultValues, onSubmit, onCancel, submitLabel = "Save guest" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(guestSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Name" placeholder="Chief Adewale Johnson" error={errors.name?.message} {...register("name")} />
      <Input label="Phone (optional)" placeholder="08031234567" error={errors.phone?.message} {...register("phone")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Group" options={GUEST_GROUPS} error={errors.group?.message} {...register("group")} />
        <Input label="People coming with them" type="number" min="1" hint="Including the guest" error={errors.partySize?.message} {...register("partySize")} />
      </div>
      <Select label="Reply" options={toOptions(RSVP_STATUS)} error={errors.rsvp?.message} {...register("rsvp")} />
      <Checkbox label="Buying aso-ebi" {...register("asoEbi")} />
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
