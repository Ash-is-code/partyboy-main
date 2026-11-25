import { differenceInCalendarDays, format, isBefore, parseISO, startOfToday } from "date-fns";

export const formatDate = (iso) => format(parseISO(iso), "EEE, d MMM yyyy");
export const daysUntil = (iso) => differenceInCalendarDays(parseISO(iso), startOfToday());
export const isPastDate = (iso) => isBefore(parseISO(iso), startOfToday());