import { RowActions } from "@/components/ui/RowActions";
import { Table, Td } from "@/components/ui/Table";
import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/currency";

export function BudgetTable({ lines, onEdit, onDelete }) {
  return (
    <Table headers={["Category", "Item", "Planned", "Spent", "Difference", ""]}>
      {lines.map((line) => {
        const diff = line.estimated - line.actual;
        return (
          <tr key={line.id}>
            <Td className="font-semibold">{line.category}</Td>
            <Td>{line.item}</Td>
            <Td>{formatNaira(line.estimated)}</Td>
            <Td>{formatNaira(line.actual)}</Td>
            <Td className={cn("font-semibold", diff < 0 ? "text-red-700" : "text-leaf-600")}>
              {diff < 0 ? `${formatNaira(-diff)} over` : `${formatNaira(diff)} left`}
            </Td>
            <Td>
              <RowActions onEdit={() => onEdit(line)} onDelete={() => onDelete(line)} />
            </Td>
          </tr>
        );
      })}
    </Table>
  );
}
