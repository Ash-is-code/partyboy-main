import { z } from "zod";
import { EVENT_TYPE } from "./constants";

export const eventSchema = z.object({
  title: z.string().trim().min(2, "Give the event a name"),
  type: z.enum(Object.keys(EVENT_TYPE)),
  date: z.string().min(1, "Pick the date"),
  venue: z.string().trim().min(2, "Where is it holding?"),
  expectedGuests: z.coerce.number().int("Use a whole number").min(1, "Expect at least 1 guest"),
});
