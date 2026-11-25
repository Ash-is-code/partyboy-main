export const DIRECTION = {
  incoming: { label: "Money in", hint: "Aso-ebi, contributions, gifts" },
  outgoing: { label: "Money out", hint: "Vendor deposits and balances" },
};

export const PAYMENT_STATUS = {
  pending: { label: "Pending", tone: "warning" },
  paid: { label: "Paid", tone: "success" },
  overdue: { label: "Overdue", tone: "danger" },
};

export const PAYMENT_DEFAULTS = {
  direction: "incoming",
  label: "",
  amount: 0,
  dueDate: "",
  status: "pending",
};
