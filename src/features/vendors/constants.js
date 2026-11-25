export const VENDOR_CATEGORIES = [
  "Caterer", "DJ", "MC", "Decorator", "Photographer", "Videographer",
  "Venue", "Makeup artist", "Cake", "Tailor", "Other",
];

export const BOOKING_STATUS = {
  inquiry: { label: "Enquiry", tone: "neutral" },
  booked: { label: "Booked", tone: "brand" },
  paid: { label: "Paid in full", tone: "success" },
  cancelled: { label: "Cancelled", tone: "danger" },
};

export const VENDOR_DEFAULTS = {
  name: "",
  category: "Caterer",
  phone: "",
  quote: 0,
  status: "inquiry",
};
