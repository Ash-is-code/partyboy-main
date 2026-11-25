import { z } from "zod";
import { BUDGET_CATEGORIES } from "./constants";

export const budgetLineSchema = z.object({
  category: z.enum(BUDGET_CATEGORIES),
  item: z.string().trim().min(2, "Describe what this covers"),
  estimated: z.coerce.number().min(0, "Amount can't be negative"),
  actual: z.coerce.number().min(0, "Amount can't be negative"),
});
