import { Badge } from "@/components/ui/Badge";
import { PAYMENT_STATUS } from "../constants";

export function PaymentStatusPill({ status }) {
  const { label, tone } = PAYMENT_STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}
