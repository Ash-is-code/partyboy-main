import { z } from "zod";
import { BOOKING_STATUS, VENDOR_CATEGORIES } from "./constants";

const NIGERIAN_PHONE = /^(\+?234|0)?[789][01]\d{8}$/;

export const vendorSchema = z.object({
  name: z.string().trim().min(2, "Enter the vendor's name"),
  category: z.enum(VENDOR_CATEGORIES),
  phone: z.string().trim().regex(NIGERIAN_PHONE, "Enter a valid Nigerian number").or(z.literal("")),
  quote: z.coerce.number().min(0, "Amount can't be negative"),
  status: z.enum(Object.keys(BOOKING_STATUS)),
});
