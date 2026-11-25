import { z } from "zod";
import { DIRECTION } from "./constants";

export const paymentSchema = z.object({
  direction: z.enum(Object.keys(DIRECTION)),
  label: z.string().trim().min(2, "Say who this is from or to"),
  amount: z.coerce.number().min(1, "Enter an amount above ₦0"),
  dueDate: z.string().min(1, "Pick a due date"),
  status: z.enum(["pending", "paid"]),
});
