import { z } from "zod";
import { GUEST_GROUPS, RSVP_STATUS } from "./constants";

const NIGERIAN_PHONE = /^(\+?234|0)?[789][01]\d{8}$/;

export const guestSchema = z.object({
  name: z.string().trim().min(2, "Enter the guest's name"),
  phone: z.string().trim().regex(NIGERIAN_PHONE, "Enter a valid Nigerian number").or(z.literal("")),
  group: z.enum(GUEST_GROUPS),
  rsvp: z.enum(Object.keys(RSVP_STATUS)),
  partySize: z.coerce.number().int("Use a whole number").min(1, "At least 1").max(20, "Maximum is 20"),
  asoEbi: z.boolean(),
});
