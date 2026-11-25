export const RSVP_STATUS = {
  pending: { label: "Awaiting", tone: "warning" },
  yes: { label: "Coming", tone: "success" },
  no: { label: "Can't make it", tone: "danger" },
};
export const RSVP_CYCLE = ["pending", "yes", "no"];

export const GUEST_GROUPS = ["Family", "Friends", "Work", "Church", "Neighbours", "Other"];

export const GUEST_DEFAULTS = {
  name: "",
  phone: "",
  group: "Family",
  rsvp: "pending",
  partySize: 1,
  asoEbi: false,
};
