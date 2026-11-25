import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { toOptions } from "@/lib/options";
import { EVENT_TYPE } from "../constants";
import { eventSchema } from "../schemas";

export function EventForm({ defaultValues, onSubmit, onCancel, submitLabel = "Save event" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(eventSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Event name" placeholder="Tola & Dayo's traditional wedding" error={errors.title?.message} {...register("title")} />
      <Select label="Type of event" options={toOptions(EVENT_TYPE)} error={errors.type?.message} {...register("type")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Date" type="date" error={errors.date?.message} {...register("date")} />
        <Input label="Guests expected" type="number" min="1" error={errors.expectedGuests?.message} {...register("expectedGuests")} />
      </div>
      <Input label="Venue" placeholder="Hall or address" error={errors.venue?.message} {...register("venue")} />
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
