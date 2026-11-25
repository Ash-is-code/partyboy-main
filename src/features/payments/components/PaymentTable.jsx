import { Check, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { RowActions } from "@/components/ui/RowActions";
import { Table, Td } from "@/components/ui/Table";
import { formatNaira } from "@/lib/currency";
import { formatDate } from "@/lib/dates";
import { DIRECTION } from "../constants";
import { PaymentStatusPill } from "./PaymentStatusPill";

export function PaymentTable({ payments, onEdit, onDelete, onTogglePaid }) {
  return (
    <Table headers={["Who", "Type", "Amount", "Due", "Status", ""]}>
      {payments.map((p) => (
        <tr key={p.id}>
          <Td className="font-semibold">{p.label}</Td>
          <Td>
            <Badge tone={p.direction === "incoming" ? "success" : "brand"}>{DIRECTION[p.direction].label}</Badge>
          </Td>
          <Td className="font-semibold">{formatNaira(p.amount)}</Td>
          <Td>{formatDate(p.dueDate)}</Td>
          <Td>
            <PaymentStatusPill status={p.displayStatus} />
          </Td>
          <Td>
            <RowActions onEdit={() => onEdit(p)} onDelete={() => onDelete(p)}>
              <IconButton label={p.status === "paid" ? "Mark as pending" : "Mark as paid"} onClick={() => onTogglePaid(p)}>
                {p.status === "paid" ? <RotateCcw size={16} /> : <Check size={16} />}
              </IconButton>
            </RowActions>
          </Td>
        </tr>
      ))}
    </Table>
  );
}
